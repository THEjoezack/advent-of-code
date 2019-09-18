import org.junit.Test
import kotlin.test.assertEquals

class Day4Tests {

    @Test
    fun `isValid`() {
        assertEquals(true, Day4().isValid("aa bb cc dd ee"))
        assertEquals(false, Day4().isValid("aa bb cc dd aa"))
        assertEquals(true, Day4().isValid("aa bb cc dd aaa"))
        assertEquals(false, Day4().isValid("aa bb cc     dd aa"))
    }

    @Test
    fun `countValid`() {
        val input = listOf("aa bb cc dd ee","aa bb cc dd aa", "aa bb cc dd aaa")
        assertEquals(2, Day4().countValid(input))
    }

    @Test
    fun `isValidAnagram`() {
        assertEquals(false, Day4().isValidAnagram("aabb baba"))
        assertEquals(true, Day4().isValidAnagram("aabb bab"))
    }

}