import org.junit.Test
import kotlin.test.assertEquals

class Day7Tests {
    @Test
    fun `pbga (66)`() {
        assertEquals("pbga", Day7().parseProgram("pbga (66)").name)
        assertEquals(66, Day7().parseProgram("pbga (66)").weight)
        assertEquals(null, Day7().parseProgram("pbga (66)").childrenNames)
    }

    @Test
    fun `fwft (72) - ktlj, cntj, xhth`() {
        val input = "fwft (72) -> ktlj, cntj, xhth"
        assertEquals("fwft", Day7().parseProgram(input).name)
        assertEquals(72, Day7().parseProgram(input).weight)
        assertEquals("ktlj, cntj, xhth", Day7().parseProgram(input).childrenNames!!.joinToString())
    }

    @Test
    fun `get root`() {
        val input = "pbga (66)\n" +
                "xhth (57)\n" +
                "ebii (61)\n" +
                "havc (66)\n" +
                "ktlj (57)\n" +
                "fwft (72) -> ktlj, cntj, xhth\n" +
                "qoyq (66)\n" +
                "padx (45) -> pbga, havc, qoyq\n" +
                "tknk (41) -> ugml, padx, fwft\n" +
                "jptl (61)\n" +
                "ugml (68) -> gyxo, ebii, jptl\n" +
                "gyxo (61)\n" +
                "cntj (57)"
        assertEquals("tknk", Day7().getRoot(input.split("\n")).name)
    }

    @Test
    fun `sum weights`() {
        val input = "pbga (66)\n" +
                "xhth (57)\n" +
                "ebii (61)\n" +
                "havc (66)\n" +
                "ktlj (57)\n" +
                "fwft (72) -> ktlj, cntj, xhth\n" +
                "qoyq (66)\n" +
                "padx (45) -> pbga, havc, qoyq\n" +
                "tknk (41) -> ugml, padx, fwft\n" +
                "jptl (61)\n" +
                "ugml (68) -> gyxo, ebii, jptl\n" +
                "gyxo (61)\n" +
                "cntj (57)"

        val target = Day7()
        val root = target.getRoot(input.split("\n"))
        assertEquals(778,target.updateWeights(root))
        assertEquals(251,target.programs["ugml"]!!.totalWeight)
        assertEquals(243,target.programs["padx"]!!.totalWeight)
        assertEquals(243,target.programs["fwft"]!!.totalWeight)
    }
    @Test
    fun `get ideal weight`() {
        val input = "pbga (66)\n" +
                "xhth (57)\n" +
                "ebii (61)\n" +
                "havc (66)\n" +
                "ktlj (57)\n" +
                "fwft (72) -> ktlj, cntj, xhth\n" +
                "qoyq (66)\n" +
                "padx (45) -> pbga, havc, qoyq\n" +
                "tknk (41) -> ugml, padx, fwft\n" +
                "jptl (61)\n" +
                "ugml (68) -> gyxo, ebii, jptl\n" +
                "gyxo (61)\n" +
                "cntj (57)"

        val target = Day7()
        val root = target.getRoot(input.split("\n"))
        target.updateWeights(root)
        assertEquals(60, target.getIdealWeight(root))
    }
}