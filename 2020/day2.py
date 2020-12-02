def count_good_passwords_v1(filename):
    good_password_count = 0
    with open(filename, "r") as f:
        for l in f.readlines():
            (positions, letter, password) = parse(l)

            letter_count = password.count(letter)
            if letter_count >= positions[0] and letter_count <= positions[1]:
                good_password_count += 1

    return good_password_count


def count_good_passwords_v2(filename):
    good_password_count = 0
    with open(filename, "r") as f:
        for l in f.readlines():
            (positions, letter, password) = parse(l)

            if (password[positions[0] - 1] == letter) ^ (password[positions[1] - 1] == letter):
                good_password_count += 1

    return good_password_count


def parse(l: str):
    rules_str, letter_str, password_str = l.split(" ")
    rule_min, rule_max = [int(m) for m in rules_str.split("-")]
    return (rule_min, rule_max), letter_str[0], password_str.strip()


if __name__ == '__main__':
    result = count_good_passwords_v1("data/day2-test.txt")
    print(result)
    result = count_good_passwords_v1("data/day2.txt")
    print(result)
    result = count_good_passwords_v2("data/day2-test.txt")
    print(result)
    result = count_good_passwords_v2("data/day2.txt")
    print(result)
