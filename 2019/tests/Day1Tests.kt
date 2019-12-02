import org.junit.Test
import kotlin.test.assertEquals

class Day1Tests {

    @Test
    fun `get fuel requirement for a single given mass`() {
        assertEquals(2, Day1().getFuelRequirement(12))
        assertEquals(2, Day1().getFuelRequirement(14))
        assertEquals(654, Day1().getFuelRequirement(1969))
        assertEquals(33583, Day1().getFuelRequirement(100756))
    }

    @Test
    fun `get fuel requirement for a list of masses sums the individual requirements`() {
        assertEquals(4, Day1().getFuelRequirement(listOf(14, 14)))
    }

    @Test
    fun `get fuel requirements, including the weight of the fuel`() {
        assertEquals(2, Day1().getInclusiveFuelRequirement(14))
        assertEquals(966, Day1().getInclusiveFuelRequirement(1969))
        assertEquals(50346, Day1().getInclusiveFuelRequirement(100756))
    }

    @Test
    fun `get fuel requirements, including the weight of the fuel for multiple components`() {
        assertEquals(4, Day1().getInclusiveFuelRequirement(listOf(14, 14)))
        assertEquals(1932, Day1().getInclusiveFuelRequirement(listOf(1969, 1969)))
    }
}