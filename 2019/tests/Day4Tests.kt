import org.junit.Test
import kotlin.test.assertEquals

class Day4Tests {

    @Test
    fun `test isValidPassword`() {
        assertEquals(false, Day4().isValidPassword(11111))
        assertEquals(true, Day4().isValidPassword(111111))
        assertEquals(false, Day4().isValidPassword(223450))
        assertEquals(false, Day4().isValidPassword(123789))
    }

    @Test
    fun `test isStrictValidPassword`() {
        assertEquals(true, Day4().isStrictValidPassword(112233))
        assertEquals(false, Day4().isStrictValidPassword(123444))
        assertEquals(true, Day4().isStrictValidPassword(111122))
    }

}