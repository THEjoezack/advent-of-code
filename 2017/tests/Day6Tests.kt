import org.junit.Test
import kotlin.test.assertEquals

class Day6Tests {
    @Test
    fun `get max index`() {
        assertEquals(3, Day6().getMaxIndex(arrayOf(1,2,3,4)))
        assertEquals(0, Day6().getMaxIndex(arrayOf(5,2,3,4)))
    }

    @Test
    fun `redistribute`() {
        assertEquals("2412", Day6().redistribute(arrayOf(0,2,0,0), 7,3).joinToString (""))
    }

    @Test
    fun `count steps till loop`() {
        assertEquals(5, Day6().countStepsTillLoop(arrayOf(0,2,7,0)).steps)
    }

    @Test
    fun `get loop size`() {
        assertEquals(4, Day6().countStepsTillLoop(arrayOf(0,2,7,0)).loopSize)
    }
}