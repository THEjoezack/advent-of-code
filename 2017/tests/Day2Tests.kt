import org.junit.Test
import kotlin.test.assertEquals

class Day2Tests {

    @Test
    fun `getCheckSum for single line`() {
        assertEquals(8, Day2().getCheckSum("5\t1\t9\t5"))
        assertEquals(4, Day2().getCheckSum("7\t5\t3"))
        assertEquals(6, Day2().getCheckSum("2\t4\t6\t8"))
    }

    @Test
    fun `getCheckSum for multiple lines`() {
        assertEquals(18, Day2().getCheckSum("5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8"))
    }

    @Test
    fun `sumDivisibleNumbers for single line`() {
        assertEquals(4, Day2().sumDivisibleNumbers("5\t9\t2\t8"))
        assertEquals(3, Day2().sumDivisibleNumbers("9\t4\t7\t3"))
        assertEquals(2, Day2().sumDivisibleNumbers("3\t8\t6\t5"))
    }

    @Test
    fun `sumDivisibleNumbers for multiple lines`() {
        assertEquals(9, Day2().sumDivisibleNumbers("5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5"))
    }
}