import java.lang.Integer.min
import kotlin.math.abs

// https://adventofcode.com/2019/day/3

fun main(args: Array<String>) {
    val input = Day3::class.java.getResource("Day3.txt").readText().replace("\r", "")
    println(Day3().getMinCrossDistance(input))
    println(Day3().getMinCrossSteps(input))
}

class Day3 {
    private val hash = HashMap<String, Int>()
    fun getMinCrossDistance(commands: String): Int {
        val wires = commands.split("\n")
        val wire1Commands = wires[0].split(",")
        val wire2Commands = wires[1].split(",")
        return getMinCrossDistance(wire1Commands, wire2Commands)
    }

    fun getMinCrossSteps(commands: String): Int {
        val wires = commands.split("\n")
        val wire1Commands = wires[0].split(",")
        val wire2Commands = wires[1].split(",")
        return getMinCrossSteps(wire1Commands, wire2Commands)
    }

    fun getMinCrossDistance(wire1Commands: List<String>, wire2Commands: List<String>): Int {
        var current = Location(0, 0, 0, 1)
        wire1Commands.forEach {
            val line = current.grow(it)
            line.forEach { hash.putIfAbsent(it.key, it.distance()) }
            current = line.last()
        }

        current = Location(0, 0, 0, 2)
        var minDistance = Int.MAX_VALUE
        wire2Commands.forEach {
            val line = current.grow(it)
            current = line.last()
            line.forEach {
                if (hash.containsKey(it.key)) {
                    if (it.distance() > 0) {
                        minDistance = min(minDistance, it.distance())
                    }
                }
            }
        }

        return minDistance
    }

    fun getMinCrossSteps(wire1Commands: List<String>, wire2Commands: List<String>): Int {
        var current = Location(0, 0, 0, 1)
        wire1Commands.forEach {
            val line = current.grow(it)
            line.forEach { hash.putIfAbsent(it.key, it.steps) }
            current = line.last()
        }

        current = Location(0, 0, 0, 2)
        var minSteps = Int.MAX_VALUE
        wire2Commands.forEach {
            val line = current.grow(it)
            current = line.last()
            line.forEach {
                if (hash.containsKey(it.key)) {
                    if (it.distance() > 0) {
                        minSteps = min(minSteps, it.steps + hash[it.key]!!)
                    }
                }
            }
        }

        return minSteps
    }
}

data class Location(val x: Int, val y: Int, val steps: Int, val wire: Int) {
    val key = "${x}x${y}"
    fun distance() = abs(x) + abs(y)
    fun grow(command: CharSequence): List<Location> {
        val value = command.drop(1).toString().toInt()
        val locations = when (command[0]) {
            'R' -> (0..value).map { Location(x + it, y, steps + it, wire) }
            'L' -> (0..value).map { Location(x - it, y, steps + it, wire) }
            'U' -> (0..value).map { Location(x, y - it, steps + it, wire) }
            'D' -> (0..value).map { Location(x, y + it, steps + it, wire) }
            else -> throw Exception("Invalid direction: ${command[0]}")
        }
        return locations
    }
}
