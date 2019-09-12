import org.junit.Test
import kotlin.test.assertEquals

class Day1Tests {

    @Test
    fun `sumDuplicateValues`() {
        assertEquals(3, Day1().sumDuplicateValues("1122"))
        assertEquals(4, Day1().sumDuplicateValues("1111"))
        assertEquals(0, Day1().sumDuplicateValues("1234"))
        assertEquals(9, Day1().sumDuplicateValues("91212129"))
    }

    @Test
    fun `sumDuplicateMids`() {
        assertEquals(6, Day1().sumDuplicateMids("1212"))
        assertEquals(0, Day1().sumDuplicateMids("1221"))
        assertEquals(4, Day1().sumDuplicateMids("123425"))
        assertEquals(12, Day1().sumDuplicateMids("123123"))
        assertEquals(4, Day1().sumDuplicateMids("12131415"))
    }

}