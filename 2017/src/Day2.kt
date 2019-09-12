import kotlin.math.max
import kotlin.math.min

fun main(args:Array<String>) {
    val input = Day2::class.java.getResource("Day2.txt").readText()
    println(Day2().getCheckSum(input))
    println(Day2().sumDivisibleNumbers(input))
}

class Day2 {

    // https://adventofcode.com/2017/day/2
    fun getCheckSum(input:String):Int {
        val lines = input.lines()
        var checksum = 0

        for(l in lines) {
            val digits = l.split("\t").map{it.toInt()}
            var min = Int.MAX_VALUE
            var max = Int.MIN_VALUE
            for(d in digits) {
                if(d > max) {
                    max = d
                }
                if(d < min) {
                    min = d
                }
            }
            checksum += max - min
        }
        return checksum
    }

    fun sumDivisibleNumbers(input:String):Int {
        val lines = input.lines()
        var sum = 0

        for(l in lines) {
            val digits = l.split("\t").map{it.toInt()}

            var found = false
            val last = digits.size - 1
            for(i in (0..last)) {
                for(j in ((i + 1)..last)) {
                    val bigger = max(digits[i], digits[j])
                    val smaller = min(digits[i], digits[j])
                    if(bigger % smaller == 0) {
                        sum += bigger / smaller
                        found = true
                        break
                    }
                }
                if(found) break
            }
        }
        return sum
    }

}
