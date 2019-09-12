import java.io.File

fun main(args:Array<String>) {
    val input = Day1::class.java.getResource("Day1.txt").readText()
    println(Day1().sumDuplicateValues(input))
    println(Day1().sumDuplicateMids(input))
}

class Day1 {

    // https://adventofcode.com/2017/day/1

    fun sumDuplicateValues(captcha:String):Int {
        var sum = 0
        val digits = captcha.map{it.toString().toInt()}
        val last = digits.size - 1
        for(i in (0..last)) {
            val b = (i + 1) % digits.size
            if(digits[i] == digits[b]) {
                sum += digits[i]
            }
        }
        return sum
    }

    fun sumDuplicateMids(captcha:String):Int {
        var sum = 0
        val digits = captcha.map{it.toString().toInt()}
        val last = digits.size - 1
        for(i in (0..last)) {
            val b = (i + (digits.size / 2)) % digits.size
            if(digits[i] == digits[b]) {
                sum += digits[i]
            }
        }
        return sum
    }

}
