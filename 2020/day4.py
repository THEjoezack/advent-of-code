
import pytest
import typing
import re

field_pattern = re.compile(r'(\w+):([^\s]+)')
height_pattern = re.compile(r'^(\d+)(cm|in)$')
color_pattern = re.compile(r'^#[a-f0-9]{6}$')
pid_pattern = re.compile(r'^\d{9}$')
eye_colors = set("amb blu brn gry grn hzl oth".split(" "))
required_fields = ['byr',
                   'iyr',
                   'eyr',
                   'hgt',
                   'hcl',
                   'ecl',
                   'pid',
                   ]


def count_valid_passports(filename, validation_function):
    valid_passports = 0
    with open(filename) as f:
        current_passport = {}

        for line in f.readlines():
            if line == "\n":
                if validation_function(current_passport):
                    valid_passports += 1
                current_passport = {}
            else:
                groups = field_pattern.findall(line)
                for key, value in groups:
                    current_passport[key] = value

    if len(current_passport) != 0:
        if simple_validation(current_passport):
            valid_passports += 1

    return valid_passports


def simple_validation(passport: typing.Dict):
    s = sum(map(lambda f: 1 if f in passport else 0, required_fields))
    return s == len(required_fields)


def valid_in_range(s, lower, upper):
    try:
        val = int(s)
        return val >= lower and val <= upper
    except ValueError:
        return False


def valid_height(s):
    try:
        groups = re.findall(height_pattern, s)
        if len(groups) != 1:
            return False

        if groups[0][1] == "cm":
            return valid_in_range(groups[0][0], 150, 193)

        return valid_in_range(groups[0][0], 59, 76)

    except ValueError:
        return False


def valid_re(pattern, s):
    return not re.match(pattern, s) == None


rules = {
    "byr": lambda s: valid_in_range(s, 1920, 2002),
    "iyr": lambda s: valid_in_range(s, 2010, 2020),
    "eyr": lambda s: valid_in_range(s, 2020, 2030),
    "hgt": lambda s: valid_height(s),
    "hcl": lambda s: valid_re(color_pattern, s),
    "ecl": lambda s: s in eye_colors,
    "pid": lambda s: valid_re(pid_pattern, s)
}


def complex_validation(passport: typing.Dict):
    if not simple_validation(passport):
        return False

    for key in required_fields:
        if not rules[key](passport[key]):
            return False

    return True


@pytest.mark.parametrize("expected,input,lower,upper", [
    (True, "1920", 1920, 2002),
    (True, "2002", 1920, 2002),
    (False, "2020", 1920, 2002),
    (False, "asf1920", 1920, 2002),
    (False, "1920asfa", 1920, 2002),
    (False, "19a20", 1920, 2002),
    (False, "", 1920, 2002),

])
def test_ranges(expected, input, lower, upper):
    assert expected == valid_in_range(input, lower, upper)


@pytest.mark.parametrize("expected,input", [
    (False, "35"),
    (False, "35in"),
    (False, "35cm"),
    (False, "149cm"),
    (True, "150cm"),
    (True, "193cm"),
    (False, "194cm"),
    (True, "187cm"),
    (False, "187c"),
    (False, "187i"),
    (True, "59in"),
    (True, "76in"),
    (False, "77in"),
    (False, "58in"),
    (False, "a187cm"),
    (False, "187cma"),
    (False, "193in"),
])
def test_height(expected, input):
    assert expected == valid_height(input)


@pytest.mark.parametrize("expected,input", [
    (True, "#12ac42"),
    (True, "#22ac42"),
    (False, "22ac42"),
    (False, "#22ac420"),
    (False, "#"),
    (False, ""),
    (False, "221122"),
    (False, "z")
])
def test_color(expected, input):
    assert expected == valid_re(color_pattern, input)


@pytest.mark.parametrize("expected,input", [
    (True, "012345678"),
    (False, "1111111112"),
    (True, "023123123"),
    (True, "000000000"),
    (False, "a000000000"),
    (False, "00000000"),
    (False, "0000000011")
])
def test_pid(expected, input):
    assert expected == valid_re(pid_pattern, input)


@pytest.mark.parametrize("expected,filename,validation_method", [
    (2, "data\\day4-sample.txt", simple_validation),
    (233, "data\\day4.txt", simple_validation),
    (4, "data\\day4-b-sample.txt", complex_validation)
])
def test_part(expected, filename, validation_method):
    assert expected == count_valid_passports(filename, validation_method)


if __name__ == "__main__":
    answer = count_valid_passports(
        "data\\day4.txt", complex_validation)
    print(f"{answer} == ?")
