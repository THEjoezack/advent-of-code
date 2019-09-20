import java.util.*
import kotlin.collections.HashMap

fun main(args: Array<String>) {
    val input = Day7::class.java.getResource("Day7.txt").readText().replace("\r", "").split("\n")
    val target = Day7()
    val root = target.getRoot(input)
    println(root.name)
    target.updateWeights(root)
    println(target.getIdealWeight(root))
}

data class Program(
    val name: String,
    var weight: Int,
    var childrenNames: List<String>?,
    var parent: Program?,
    var totalWeight: Int
)

class Day7 {
    val programs = HashMap<String, Program>()

    fun parseProgram(s: String): Program {
        val parts = s.split(" ")
        val name = parts[0]
        val weight = parts[1].replace(Regex("[^\\d]+"), "").toInt()
        var childrenNames: List<String>? = null
        if (parts.size > 3) {
            childrenNames = parts.subList(3, parts.size).map { it.replace(",", "") }
        }
        return Program(name, weight, childrenNames, null, weight)
    }

    fun getRoot(input: List<String>): Program {
        input.forEach { l ->
            val p = parseProgram(l)
            add(p)
        }
        var current = programs.entries.first().value
        while (current.parent != null) {
            current = current.parent!!
        }
        return current
    }

    fun add(p: Program) {
        p.parent = programs[p.name]?.parent // save the placeholder's parent, if it has one
        programs[p.name] = p

        p.childrenNames?.forEach { c ->
            if (programs.containsKey(c)) {
                // we've seen this one before, set the parent
                programs[c]!!.parent = p
            } else {
                // insert a placeholder with the correct parent
                programs[c] = Program(c, 0, null, p, 0)
            }
        }
    }

    fun updateWeights(root: Program):Int {
        if(root.childrenNames != null) {
            root.totalWeight += root.childrenNames!!.map { updateWeights(programs[it]!!) }.sum()
        }
        return root.totalWeight
    }

    fun getIdealWeight(root: Program):Int {
        val q = LinkedList<Program>()
        var lastResult = 0
        q.add(root)
        while(q.size > 0) {
            val current = q.removeFirst()
            if(current.childrenNames != null) {
                val sorted = current.childrenNames!!.map { programs[it] }.sortedBy { it!!.totalWeight }
                if(sorted[0]!!.totalWeight != sorted[sorted.size - 1]!!.totalWeight) {
                    val diff = sorted[sorted.size - 1]!!.totalWeight - sorted[0]!!.totalWeight
                    lastResult = sorted[sorted.size - 1]!!.weight - diff
                }
                current.childrenNames!!.forEach { q.add(programs[it]!!) }
            }
        }
        return lastResult
    }
}