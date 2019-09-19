fun main(args: Array<String>) {
    val input = Day6::class.java.getResource("Day6.txt").readText().split("\t").map { it.toInt() }.toTypedArray()
    val result = Day6().countStepsTillLoop(input)
    println(result.steps)
    println(result.loopSize)
}

data class Result(val steps:Int, val loopSize:Int)

class Day6 {
    fun countStepsTillLoop(banks: Array<Int>): Result {
        val seen = HashMap<String, Int>()
        var count = 0

        while (true) {
            val key = banks.joinToString { it.toString() }
            if (seen.contains(key)) {
                return Result(count, count - seen[key]!!)
            }
            seen[key] = count
            count++

            val maxIndex = getMaxIndex(banks)
            val blocks = banks[maxIndex]
            banks[maxIndex] = 0

            redistribute(banks, blocks, maxIndex + 1)
        }
    }

    // find the bank with the most blocks (n)
    fun getMaxIndex(banks: Array<Int>): Int {
        var maxValue = Int.MIN_VALUE
        var maxIndex = 0
        banks.forEachIndexed { index, i ->
            if (i > maxValue) {
                maxValue = i
                maxIndex = index
            }
        }
        //println("Max value ${maxValue}")
        return maxIndex
    }

    fun redistribute(banks: Array<Int>, blocks: Int, start: Int): Array<Int> {
        // we could be smarter about this...
        var i = 0
        while (i < blocks) {
            banks[(start + i) % banks.size]++
            i++
        }
        return banks
    }
}