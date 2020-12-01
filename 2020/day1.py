import unittest
import itertools


def day1a(filename):
    with open(filename, "r") as f:
        entries = [int(e) for e in set(f.read().split("\n"))]

    for e in entries:
        required = 2020 - e
        if required in entries:
            return required * e

    return -1


def day1b(filename):
    with open(filename, "r") as f:
        entries = [int(e) for e in set(f.read().split("\n"))]

    permutations = itertools.permutations(entries, 3)
    for a, b, c in permutations:
        if a + b + c == 2020:
            return a * b * c

    return -1


class TestDay(unittest.TestCase):
    def test_day1a_example(self):
        result = day1a("data/day1-test.txt")
        self.assertEqual(514579, result)

    def test_day1a_real(self):
        result = day1a("data/day1.txt")
        self.assertEqual(838624, result)

    def test_day1b_example(self):
        result = day1b("data/day1-test.txt")
        self.assertEqual(241861950, result)

    def test_day1b_real(self):
        result = day1b("data/day1.txt")
        self.assertEqual(52764180, result)


if __name__ == '__main__':
    unittest.main()
