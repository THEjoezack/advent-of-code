import org.junit.Test
import kotlin.test.assertEquals

class Day3Tests {

    @Test
    fun `test grow directions`() {
        assertEquals("10x0", Location(0,0, 0, 1).grow("R10").last().key)
        assertEquals("-10x0", Location(0,0, 0, 1).grow("L10").last().key)
        assertEquals("0x10", Location(0,0, 0, 1).grow("D10").last().key)
        assertEquals("0x-10", Location(0,0, 0, 1).grow("U10").last().key)
    }

    @Test
    fun `test location distance`() {
        assertEquals(20, Location(10,10, 0, 1).distance())
        assertEquals(20, Location(-10,-10, 0, 1).distance())
        assertEquals(20, Location(-10,10, 0, 1).distance())
    }

    @Test
    fun `test known min distance values`() {
        assertEquals(1, Day3().getMinCrossDistance("R1,D2\nL1,R1,R1,D2"))
        assertEquals(6, Day3().getMinCrossDistance("R8,U5,L5,D3\nU7,R6,D4,L4"))
        assertEquals(135, Day3().getMinCrossDistance("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7"))
        assertEquals(159, Day3().getMinCrossDistance("R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83"))
    }

    @Test
    fun `test known min step values`() {
        assertEquals(30, Day3().getMinCrossSteps("R8,U5,L5,D3\nU7,R6,D4,L4"))
        assertEquals(410, Day3().getMinCrossSteps("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7"))
        assertEquals(610, Day3().getMinCrossSteps("R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83"))
    }

}