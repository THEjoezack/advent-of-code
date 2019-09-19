fun main(args:Array<String>) {
    val input = Day5::class.java.getResource("Day5.txt").readText().replace("\r","")
    var parsed = ArrayList(input.split("\n").map{it.toInt()})
    println(Day5().countJumps(parsed))
    parsed = ArrayList(input.split("\n").map{it.toInt()})
    println(Day5().countCrazyJumps(parsed))
}

class Day5 {
    fun countJumps(instructions:ArrayList<Int>):Int {
        var nextIndex = 0
        var lastIndex = 0
        var jumps = 0

        while(nextIndex >= 0 && nextIndex < instructions.size) {
            //print(instructions, nextIndex)
            lastIndex = nextIndex
            nextIndex += instructions[lastIndex]
            instructions[lastIndex]++
            jumps++
        }
        return jumps
    }

    fun countCrazyJumps(instructions:ArrayList<Int>):Int {
        var nextIndex = 0
        var lastIndex = 0
        var jumps = 0

        while(nextIndex >= 0 && nextIndex < instructions.size) {
            //print(instructions, nextIndex)
            lastIndex = nextIndex
            nextIndex += instructions[lastIndex]
            if(instructions[lastIndex] >= 3) {
                instructions[lastIndex]--
            } else {
                instructions[lastIndex]++
            }
            jumps++
        }
        return jumps
    }

    fun print(instructions:ArrayList<Int>, index:Int) {
        println(instructions.mapIndexed { i,n -> if(i == index) "($n)" else "$n" })
    }
}