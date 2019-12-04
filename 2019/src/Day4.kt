// https://adventofcode.com/2019/day/4

fun main(args: Array<String>) {
    println(Day4().countValid(125730, 579381))
    println(Day4().countStrictValid(125730, 579381))
}

class Day4 {
    fun countValid(start:Int, end:Int) = (start..end).count { isValidPassword(it) }
    fun countStrictValid(start:Int, end:Int) = (start..end).count { isStrictValidPassword(it) }

    fun isValidPassword(n:Int): Boolean {
        val s = n.toString().toCharArray()
        if(s.size != 6) return false

        var atLeastOneDupe = false
        for(i in 1 until s.size) {
            if(s[i] == s[i - 1]) {
                atLeastOneDupe = true
            }
            if(s[i] < s[i - 1]) {
                return false
            }
        }

        return atLeastOneDupe
    }

    fun isStrictValidPassword(n:Int): Boolean {
        val s = n.toString().toCharArray()
        if(s.size != 6) return false

        var atLeastOneDouble = false
        var i = 1
        while(i < s.size) {
            if (s[i] < s[i - 1]) {
                return false
            }
            if (s[i] == s[i - 1]) {
                if (i == (s.size - 1) || s[i + 1] != s[i]) {
                    atLeastOneDouble = true
                    i++
                } else {
                    while(i < s.size && s[i] == s[i - 1]) {
                        i++
                    }
                }
            } else {
                i++
            }
        }
        return atLeastOneDouble
    }
}
