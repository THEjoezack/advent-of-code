// https://adventofcode.com/2019/day/1

fun main(args: Array<String>) {
    val input = Day1::class.java.getResource("Day1.txt").readText().replace("\r", "").split("\n").map { it.toInt() }
    println(Day1().getFuelRequirement(input))
    println(Day1().getInclusiveFuelRequirement(input))
}

class Day1 {
    fun getFuelRequirement(masses: List<Int>) = masses.fold(0) { sum, i -> sum + getFuelRequirement(i) }
    fun getFuelRequirement(mass: Int) = mass / 3 - 2

    fun getInclusiveFuelRequirement(masses: List<Int>) = masses.fold(0) { sum, i -> sum + getInclusiveFuelRequirement(i) }
    fun getInclusiveFuelRequirement(mass: Int): Int {
        var additionalFuel = getFuelRequirement(mass)
        var totalFuel = 0
        do {
            totalFuel += additionalFuel
            additionalFuel = getFuelRequirement(additionalFuel)
        } while(additionalFuel > 0)
        return totalFuel
    }
}
