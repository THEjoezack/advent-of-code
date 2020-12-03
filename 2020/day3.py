def count_trees_on_slope(map, deltaX, deltaY):
    tree_count = 0

    x = 0
    y = 0

    for i in range(1, len(map) // deltaY):
        y = i * deltaY
        row = map[y]
        x = (x + deltaX) % len(row)

        if row[x] == '#':
            tree_count += 1

        #print(f"{x}x{y}: {row[x]}")

    return tree_count


def count_trees_on_multi_slope(map, slopes):
    product = 1
    for slope in slopes:
        product *= count_trees_on_slope(map, slope[0], slope[1])
    return product


def parse_file(filename):
    map = []
    with open(filename, "r") as file:
        for line in file.readlines():
            map.append(line.strip())
    return map


if __name__ == "__main__":
    test_map = parse_file("data/day3-test.txt")
    real_map = parse_file("data/day3.txt")

    print(f"7 == {count_trees_on_slope(test_map, 3, 1)}")

    print(f"254 == {count_trees_on_slope(real_map, 3, 1)}")

    slopes = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]

    print(f"2 == {count_trees_on_multi_slope(test_map, [(1, 1)])}")
    print(f"7 == {count_trees_on_multi_slope(test_map, [(3, 1)])}")
    print(f"3 == {count_trees_on_multi_slope(test_map, [(5, 1)])}")
    print(f"4 == {count_trees_on_multi_slope(test_map, [(7, 1)])}")
    print(f"2 == {count_trees_on_multi_slope(test_map, [(1, 2)])}")
    print(f"336 == {count_trees_on_multi_slope(test_map, slopes)}")

    print(f"? == {count_trees_on_multi_slope(real_map, slopes)}")
