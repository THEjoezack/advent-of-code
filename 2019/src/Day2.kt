// https://adventofcode.com/2019/day/2

fun main(args: Array<String>) {
    val input = Day1::class.java.getResource("Day2.txt").readText().split(",").map { it.toInt() }.toMutableList()
    println(Day2(input).execute().toString())
    println(Day2(input).findNounVerb().toString())
}

data class Operation(val opcode: Int, val i1: Int = 0, val i2: Int = 0, val resultIndex: Int = 0)

class Day2(val initialCodes: List<Int>) {
    private lateinit var codes:MutableList<Int>
    private var instructionIndex = 0

    fun execute(noun: Int = 12, verb: Int = 2): Int {
        refresh()
        codes[1] = noun
        codes[2] = verb
        while(executeNext());
        return codes[0]
    }

    fun findNounVerb(target: Int = 19690720): Int {
        for (n in 0..99) {
            for (v in 0..99) {
                val result = execute(n, v)
                if(result == target) {
                    return (100 * n) + v
                }
            }
        }

        throw Exception("This should never happen")
    }

    private fun refresh() {
        codes = initialCodes.toMutableList()
        instructionIndex = 0
    }

    private fun executeNext(): Boolean {
        val operation = getNext()
        if(operation.opcode == 1) {
            codes[operation.resultIndex] = codes[operation.i1] + codes[operation.i2]
            return true
        }
        if(operation.opcode == 2) {
            codes[operation.resultIndex] = codes[operation.i1] * codes[operation.i2]
            return true
        }
        return false
    }

    fun getNext():Operation {
        if(codes[instructionIndex] == 99) {
            return Operation(99)
        }
        instructionIndex += 4
        return Operation(codes[instructionIndex], codes[instructionIndex + 1], codes[instructionIndex + 2], codes[instructionIndex + 3])
    }
}
