import sys
import unittest
import time
import random
import tracemalloc
import json
import os
from sort import sort

class TestSort(unittest.TestCase):
    def test_empty_list(self):
        items = []
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, [])

    def test_single_element(self):
        items = [1]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, [1])

    def test_sorted_list(self):
        items = [1, 2, 3, 4, 5]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, [1, 2, 3, 4, 5])

    def test_reverse_sorted_list(self):
        items = [5, 4, 3, 2, 1]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, [1, 2, 3, 4, 5])

    def test_random_list(self):
        items = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        expected = sorted(items)
        self.assertEqual(result, expected)

    def test_strings(self):
        items = ["banana", "apple", "cherry", "date"]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, ["apple", "banana", "cherry", "date"])

    def test_custom_objects(self):
        class Item:
            def __init__(self, name, value):
                self.name = name
                self.value = value
            def __repr__(self):
                return f"Item({self.name}, {self.value})"
            def __eq__(self, other):
                return self.name == other.name and self.value == other.value

        items = [Item("B", 2), Item("A", 1), Item("D", 4), Item("C", 3)]
        # Sort by value
        comparator = lambda a, b: (a.value > b.value) - (a.value < b.value)
        result = sort(items, comparator)
        expected = [Item("A", 1), Item("B", 2), Item("C", 3), Item("D", 4)]
        self.assertEqual(result, expected)

    def test_large_list(self):
        items = [random.randint(0, 1000) for _ in range(1000)]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, sorted(items))

    def test_all_duplicates(self):
        items = [1, 1, 1, 1, 1]
        comparator = lambda a, b: (a > b) - (a < b)
        result = sort(items, comparator)
        self.assertEqual(result, [1, 1, 1, 1, 1])

def run_benchmarks():
    print("\n" + "="*50)
    print("RUNNING BENCHMARKS")
    print("="*50)
    
    # Using sizes that highlight complexity and cache behavior
    sizes = [100, 1000, 5000, 10000]
    results = []
    comparator = lambda a, b: (a > b) - (a < b)

    for size in sizes:
        print(f"\nBenchmarking size: {size}")
        test_data = [random.randint(0, size) for _ in range(size)]
        
        # Measure Custom Sort
        tracemalloc.start()
        start_time = time.perf_counter()
        _ = sort(test_data, comparator)
        end_time = time.perf_counter()
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        
        custom_duration = end_time - start_time
        custom_mem = peak / 1024 / 1024 # MB
        
        # Measure Built-in Sort (Baseline - simplified as it doesn't take comparator directly in same way)
        # Note: list.sort/sorted is implemented in C and extremely fast.
        start_time = time.perf_counter()
        _ = sorted(test_data)
        end_time = time.perf_counter()
        builtin_duration = end_time - start_time
        
        results.append({
            "size": size,
            "custom_time": custom_duration,
            "builtin_time": builtin_duration,
            "custom_mem_mb": custom_mem,
            "ratio": custom_duration / builtin_duration if builtin_duration > 0 else 0
        })
        
        print(f"Custom Sort Time: {custom_duration:.6f}s (RAM Peak: {custom_mem:.4f} MB)")
        print(f"Built-in Sort Time: {builtin_duration:.6f}s")
        print(f"Ratio (Custom/Built-in): {results[-1]['ratio']:.2f}x")

    # Save results
    report_path = "test/benchmark_results.json"
    with open(report_path, "w") as f:
        json.dump(results, f, indent=4)
    print(f"\nBenchmark results saved to {report_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] != "config_dunp":
        print("Usage: python test/test_sort_sort.py config_dunp")
        sys.exit(1)
    
    # Remove config_dunp from argv before running unittest
    sys.argv.pop(1)
    
    # Run tests
    suite = unittest.TestLoader().loadTestsFromTestCase(TestSort)
    runner = unittest.TextTestRunner(verbosity=2)
    test_result = runner.run(suite)
    
    if test_result.wasSuccessful():
        run_benchmarks()
    else:
        sys.exit(1)
