import math

def sort(items: list, comparator: callable) -> list:
    """
    Highly optimized custom sort implementation (Introsort).
    Combines Quicksort, Heapsort, and Insertion Sort for O(n log n) 
    guaranteed performance and cache efficiency.
    """
    if not items:
        return []
        
    # Copy to avoid side effects on input list
    arr = list(items)
    n = len(arr)
    
    if n < 2:
        return arr

    # Max depth for quicksort before switching to heapsort
    max_depth = 2 * math.floor(math.log2(n))
    
    _introsort(arr, 0, n - 1, max_depth, comparator)
    return arr

def _introsort(arr, low, high, depth_limit, cmp):
    while high - low > 16:
        if depth_limit == 0:
            _heapsort(arr, low, high, cmp)
            return
        depth_limit -= 1
        
        # Median of three pivot selection
        mid = low + (high - low) // 2
        if cmp(arr[low], arr[mid]) > 0: arr[low], arr[mid] = arr[mid], arr[low]
        if cmp(arr[low], arr[high]) > 0: arr[low], arr[high] = arr[high], arr[low]
        if cmp(arr[mid], arr[high]) > 0: arr[mid], arr[high] = arr[high], arr[mid]
        
        # 3-way partition (Dutch National Flag) to handle duplicates efficiently
        pivot = arr[mid]
        lt = low
        gt = high
        i = low
        while i <= gt:
            res = cmp(arr[i], pivot)
            if res < 0:
                arr[lt], arr[i] = arr[i], arr[lt]
                lt += 1
                i += 1
            elif res > 0:
                arr[gt], arr[i] = arr[i], arr[gt]
                gt -= 1
            else:
                i += 1
        
        # Proper 3-way recursion:
        # Recursively sort the smaller part, iteratively the larger to save stack space
        if (lt - low) < (high - gt):
            _introsort(arr, low, lt - 1, depth_limit, cmp)
            low = gt + 1
        else:
            _introsort(arr, gt + 1, high, depth_limit, cmp)
            high = lt - 1

    _insertion_sort(arr, low, high, cmp)

def _insertion_sort(arr, low, high, cmp):
    for i in range(low + 1, high + 1):
        key = arr[i]
        j = i - 1
        while j >= low and cmp(arr[j], key) > 0:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def _heapsort(arr, low, high, cmp):
    n = high - low + 1
    # Build heap
    for i in range(n // 2 - 1, -1, -1):
        _sift_down(arr, i, n, low, cmp)
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[low], arr[low + i] = arr[low + i], arr[low]
        _sift_down(arr, 0, i, low, cmp)

def _sift_down(arr, i, n, offset, cmp):
    root = i
    while True:
        child = 2 * root + 1
        if child >= n:
            break
        if child + 1 < n and cmp(arr[offset + child], arr[offset + child + 1]) < 0:
            child += 1
        if cmp(arr[offset + root], arr[offset + child]) < 0:
            arr[offset + root], arr[offset + child] = arr[offset + child], arr[offset + root]
            root = child
        else:
            break
