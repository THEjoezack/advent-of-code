fun main(args:Array<String>) {
    val input = Day4::class.java.getResource("Day4.txt").readText()
    println(Day4().countValid(input.split("\n")))
    println(Day4().countValidAnagram(input.split("\n")))
}

class Day4 {

    // https://adventofcode.com/2017/day/4
    fun countValid(paraphrases: List<String>):Int {
        return paraphrases.fold(0) { sum, w -> if(isValid(w)) sum + 1 else sum }
    }

    fun countValidAnagram(paraphrases: List<String>):Int {
        return paraphrases.fold(0) { sum, w -> if(isValidAnagram(w)) sum + 1 else sum }
    }

    fun isValid(passphrase:String): Boolean {
        val hash = HashSet<String>()
        val words = passphrase.split(Regex("\\s+"))
        for(w in words) {
            if(hash.contains(w)) {
                return false
            }
            hash.add(w)
        }
        return true
    }

    fun isValidAnagram(passphrase:String): Boolean {
        val hash = HashSet<String>()
        val words = passphrase.split(Regex("\\s+"))
        for(w in words) {
            val sortedWord = w.toList().sortedBy { it }.joinToString("")
            if(hash.contains(sortedWord)) {
                return false
            }
            hash.add(sortedWord)
        }
        return true
    }

}
