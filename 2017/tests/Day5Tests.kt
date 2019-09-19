import org.junit.Test
import kotlin.test.assertEquals

class Day5Tests {
    @Test
    fun `count number of jumps`() {
        assertEquals(5, Day5().countJumps(arrayListOf(0,3,0,1,-3)))
    }
    @Test
    fun `count crazy number of jumps`() {
        assertEquals(10, Day5().countCrazyJumps(arrayListOf(0,3,0,1,-3)))
    }
}