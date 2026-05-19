import 'dart:async';
import 'package:flutter/material.dart';

typedef AutocompleteDataProvider<T> = Future<List<T>> Function(String query, int pageIndex, int pageSize);

class TotAutocomplete<T> extends StatefulWidget {
  final String label;
  final String hintText;
  final bool isMultiSelect;
  final AutocompleteDataProvider<T> dataProvider;
  final String Function(T item) itemLabelBuilder;
  final List<T> initialSelection;
  final void Function(List<T> selectedItems) onSelectionChanged;

  const TotAutocomplete({
    super.key,
    required this.label,
    this.hintText = 'Select option...',
    this.isMultiSelect = false,
    required this.dataProvider,
    required this.itemLabelBuilder,
    required this.initialSelection,
    required this.onSelectionChanged,
  });

  @override
  State<TotAutocomplete<T>> createState() => _TotAutocompleteState<T>();
}

class _TotAutocompleteState<T> extends State<TotAutocomplete<T>> {
  // In-memory static cache for the lifetime of the session, keyed by label/search query
  static final Map<String, List<dynamic>> _sessionCache = {};

  late List<T> _selectedItems;

  @override
  void initState() {
    super.initState();
    _selectedItems = List<T>.from(widget.initialSelection);
  }

  void _openSelectionSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _AutocompleteSelectionSheet<T>(
        hintText: widget.hintText,
        isMultiSelect: widget.isMultiSelect,
        dataProvider: widget.dataProvider,
        itemLabelBuilder: widget.itemLabelBuilder,
        initialSelection: _selectedItems,
        sessionCache: _sessionCache,
        onSelected: (items) {
          setState(() {
            _selectedItems = items;
          });
          widget.onSelectionChanged(_selectedItems);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final displayValue = _selectedItems.isEmpty
        ? widget.hintText
        : _selectedItems.map((e) => widget.itemLabelBuilder(e)).join(', ');

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label.isNotEmpty) ...[
          Text(
            widget.label,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          ),
          const SizedBox(height: 8),
        ],
        GestureDetector(
          onTap: _openSelectionSheet,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.grey.shade50,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey.shade300),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    displayValue,
                    style: TextStyle(
                      color: _selectedItems.isEmpty ? Colors.grey : Colors.black87,
                      fontSize: 15,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const Icon(Icons.arrow_drop_down, color: Colors.grey),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _AutocompleteSelectionSheet<T> extends StatefulWidget {
  final String hintText;
  final bool isMultiSelect;
  final AutocompleteDataProvider<T> dataProvider;
  final String Function(T item) itemLabelBuilder;
  final List<T> initialSelection;
  final Map<String, List<dynamic>> sessionCache;
  final void Function(List<T> selectedItems) onSelected;

  const _AutocompleteSelectionSheet({
    required this.hintText,
    required this.isMultiSelect,
    required this.dataProvider,
    required this.itemLabelBuilder,
    required this.initialSelection,
    required this.sessionCache,
    required this.onSelected,
  });

  @override
  State<_AutocompleteSelectionSheet<T>> createState() => _AutocompleteSelectionSheetState<T>();
}

class _AutocompleteSelectionSheetState<T> extends State<_AutocompleteSelectionSheet<T>> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  
  List<T> _items = [];
  late List<T> _tempSelected;
  bool _isLoading = false;
  bool _hasMore = true;
  int _pageIndex = 1;
  static const int _pageSize = 10;
  
  Timer? _debounce;
  String _currentQuery = '';

  @override
  void initState() {
    super.initState();
    _tempSelected = List<T>.from(widget.initialSelection);
    _scrollController.addListener(_scrollListener);
    
    // Attempt to load from session cache initially
    _loadFromCacheOrServer();
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    _debounce?.cancel();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      if (!_isLoading && _hasMore) {
        _loadNextPage();
      }
    }
  }

  String get _cacheKey => 'query_cache_$_currentQuery';

  void _loadFromCacheOrServer() {
    // Look up in session cache
    if (widget.sessionCache.containsKey(_cacheKey)) {
      final cached = widget.sessionCache[_cacheKey]!.cast<T>();
      setState(() {
        _items = cached;
        _pageIndex = 2; // Next page starts from 2
        _hasMore = cached.length >= _pageSize;
      });
      // Refresh in background to sync latest state
      _fetchItems(isBackgroundRefresh: true);
    } else {
      _fetchItems();
    }
  }

  Future<void> _fetchItems({bool isBackgroundRefresh = false}) async {
    if (_isLoading) return;
    
    setState(() {
      _isLoading = !isBackgroundRefresh;
    });

    try {
      final results = await widget.dataProvider(_currentQuery, 1, _pageSize);
      
      if (mounted) {
        setState(() {
          _items = results;
          _pageIndex = 2;
          _hasMore = results.length >= _pageSize;
        });
        
        // Save to cache
        widget.sessionCache[_cacheKey] = results;
      }
    } catch (e) {
      debugPrint('[TotAutocomplete] Error loading items: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _loadNextPage() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final results = await widget.dataProvider(_currentQuery, _pageIndex, _pageSize);
      
      if (mounted) {
        setState(() {
          _items.addAll(results);
          _pageIndex++;
          _hasMore = results.length >= _pageSize;
        });
        
        // Update cache with appended items
        widget.sessionCache[_cacheKey] = _items;
      }
    } catch (e) {
      debugPrint('[TotAutocomplete] Error loading next page: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _onSearchChanged(String query) {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    
    _debounce = Timer(const Duration(milliseconds: 500), () {
      setState(() {
        _currentQuery = query;
        _items.clear();
        _pageIndex = 1;
        _hasMore = true;
      });
      _loadFromCacheOrServer();
    });
  }

  void _toggleSelection(T item) {
    setState(() {
      if (widget.isMultiSelect) {
        final existing = _tempSelected.indexWhere((element) => widget.itemLabelBuilder(element) == widget.itemLabelBuilder(item));
        if (existing != -1) {
          _tempSelected.removeAt(existing);
        } else {
          _tempSelected.add(item);
        }
      } else {
        _tempSelected = [item];
        widget.onSelected(_tempSelected);
        Navigator.pop(context);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final viewInsets = MediaQuery.of(context).viewInsets;

    return Container(
      margin: EdgeInsets.only(top: 80, bottom: viewInsets.bottom),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          // Header Drag Handle
          Center(
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 12),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.hintText,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
                if (widget.isMultiSelect)
                  TextButton(
                    onPressed: () {
                      widget.onSelected(_tempSelected);
                      Navigator.pop(context);
                    },
                    child: const Text(
                      'Hoàn thành',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
              ],
            ),
          ),
          // Search box
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Tìm kiếm...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          _onSearchChanged('');
                        },
                      )
                    : null,
                filled: true,
                fillColor: Colors.grey.shade100,
                contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
              ),
              onChanged: _onSearchChanged,
            ),
          ),
          // Items List
          Expanded(
            child: _items.isEmpty && _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _items.isEmpty
                    ? const Center(child: Text('Không tìm thấy kết quả'))
                    : ListView.builder(
                        controller: _scrollController,
                        itemCount: _items.length + (_hasMore ? 1 : 0),
                        itemBuilder: (context, index) {
                          if (index == _items.length) {
                            return const Padding(
                              padding: EdgeInsets.symmetric(vertical: 16),
                              child: Center(child: CircularProgressIndicator()),
                            );
                          }

                          final item = _items[index];
                          final label = widget.itemLabelBuilder(item);
                          final isChecked = _tempSelected.any((element) => widget.itemLabelBuilder(element) == label);

                          return ListTile(
                            title: Text(label),
                            trailing: isChecked
                                ? Icon(Icons.check_circle, color: theme.colorScheme.primary)
                                : widget.isMultiSelect
                                    ? const Icon(Icons.radio_button_unchecked, color: Colors.grey)
                                    : null,
                            onTap: () => _toggleSelection(item),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
