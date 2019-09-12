import org.junit.Test
import kotlin.test.assertEquals

class Day3Tests {

    @Test
    fun `count steps`() {
        assertEquals(0, Day3().countSteps(1))
        assertEquals(3, Day3().countSteps(12))
        assertEquals(2, Day3().countSteps(23))
        assertEquals(31, Day3().countSteps(1024))
        assertEquals(480, Day3().countSteps(347991))
    }

    @Test
    fun `ring index returned correctly for n`() {
        assertEquals(0, Day3().getRingIndex(1))
        assertEquals(1, Day3().getRingIndex(2))
        assertEquals(1, Day3().getRingIndex(3))
        assertEquals(1, Day3().getRingIndex(9))
        assertEquals(2, Day3().getRingIndex(10))
        assertEquals(2, Day3().getRingIndex(25))
        assertEquals(3, Day3().getRingIndex(26))
    }

    @Test
    fun `position returned correctly for n`() {
        assertEquals(0, Day3().getPosition(1).rollingIndex)
        assertEquals(0, Day3().getPosition(2).rollingIndex)
        assertEquals(1, Day3().getPosition(3).rollingIndex)
        assertEquals(2, Day3().getPosition(4).rollingIndex)
        assertEquals(7, Day3().getPosition(9).rollingIndex)
        assertEquals(0, Day3().getPosition(10).rollingIndex)
        assertEquals(15, Day3().getPosition(25).rollingIndex)
        assertEquals(0, Day3().getPosition(26).rollingIndex)
    }

    @Test
    fun `get move direction for n`() {
        assertEquals(Day3.Direction.NONE, Day3().move(1).direction)
        assertEquals(Day3.Direction.LEFT, Day3().move(2).direction)
        assertEquals(Day3.Direction.LEFT, Day3().move(3).direction)
        assertEquals(Day3.Direction.LEFT, Day3().move(11).direction)
        assertEquals(Day3.Direction.DOWN, Day3().move(4).direction)
        assertEquals(Day3.Direction.DOWN, Day3().move(15).direction)
        assertEquals(Day3.Direction.RIGHT, Day3().move(21).direction)
        assertEquals(Day3.Direction.UP, Day3().move(24).direction)
        assertEquals(Day3.Direction.UP, Day3().move(25).direction)
    }

    @Test
    fun `get ring position after move`() {
        assertEquals(0, Day3().move(2).position.ring.index)
        assertEquals(0, Day3().move(8).position.ring.index)
        assertEquals(1, Day3().move(11).position.ring.index)
        assertEquals(1, Day3().move(16).position.ring.index)
        assertEquals(1, Day3().move(20).position.ring.index)
        assertEquals(1, Day3().move(23).position.ring.index)
        assertEquals(1, Day3().move(24).position.ring.index)
        assertEquals(0, Day3().move(6).position.ring.index)
    }

    @Test
    fun `get ring position after diagonal`() {
        assertEquals(1, Day3().move(3).position.ring.index)
        assertEquals(1, Day3().move(5).position.ring.index)
        assertEquals(1, Day3().move(7).position.ring.index)
        assertEquals(1, Day3().move(9).position.ring.index)
        assertEquals(2, Day3().move(25).position.ring.index)
        assertEquals(2, Day3().move(13).position.ring.index)
        assertEquals(2, Day3().move(17).position.ring.index)
        assertEquals(2, Day3().move(21).position.ring.index)
    }

    @Test
    fun `get rolling index after move`() {
        assertEquals(0, Day3().move(2).position.rollingIndex)
        assertEquals(2, Day3().move(3).position.rollingIndex)
        assertEquals(0, Day3().move(4).position.rollingIndex)
        assertEquals(4, Day3().move(13).position.rollingIndex)
    }

    @Test
    fun `get memory after n`() {
        assertEquals(2, Day3().getMemoryAfter(1))
        assertEquals(4, Day3().getMemoryAfter(2))
        assertEquals(5, Day3().getMemoryAfter(4))
        assertEquals(304, Day3().getMemoryAfter(147))
        assertEquals(349975, Day3().getMemoryAfter(347991))

    }
}