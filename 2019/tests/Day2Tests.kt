import org.junit.Test
import kotlin.test.assertEquals

class Day2Tests {

    //  1, 2, or 99.
    // Opcode 1 adds together numbers read from two positions and stores the result in a third position. The three integers immediately after the opcode tell you these three positions - the first two indicate the positions from which you should read the input values, and the third indicates the position at which the output should be stored.
    // 99 means that the program is finished and should immediately halt.
    // Once you're done processing an opcode, move to the next one by stepping forward 4 positions.
    @Test
    fun `get fuel requirement for a single given mass`() {
        val input = "1,9,10,70,2,3,11,0,99,30,40,50".split(",").map{it.toInt()}.toMutableList()

        assertEquals(3500, Day2(input).execute())
    }

}