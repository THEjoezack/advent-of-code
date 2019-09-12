import kotlin.math.abs
import kotlin.math.max

class Day3 {

    data class Ring(val min:Int, val max:Int, val size:Int, val sideLength:Int, val index:Int)
    data class Position(val rollingIndex:Int, val ring:Ring)

    class P {
        val x:Int
        val y:Int
        var value = -1

        constructor(x:Int, y:Int, steps:HashMap<String,Int>) {
            this.x = x
            this.y = y
            save(steps)
        }

        private fun save(steps:HashMap<String,Int>) {
            value = max(1, arrayOf(
                "${x + 1}x${y}",
                "${x + 1}x${y - 1}",
                "${x}x${y-1}",
                "${x-1}x${y-1}",
                "${x-1}x${y}",
                "${x-1}x${y+1}",
                "${x}x${y+1}",
                "${x+1}x${y+1}")
                .filter{steps.containsKey(it)}
                .sumBy{steps[it]!!}
            )
            steps["${x}x$y"] = value
        }

    }

    private val rings = arrayListOf<Ring>()

    fun countSteps(n:Int): Int {
        val position = getPosition(n)
        val stepsFromMiddle = getStepsFromMiddle(position)
        return position.ring.index + stepsFromMiddle
    }

    // this feels inelegant!
    fun getMemoryAfter(n:Int):Int {
        val steps = HashMap<String, Int>()
        var current = P(0,0, steps)

        while(true) {
            // go right, until you can go up
            do {
                current = P(current.x+1, current.y, steps)
                if(current.value > n) return current.value
            } while (steps.containsKey("${current.x}x${current.y - 1}"))

            // go up till you can go left
            do {
                current = P(current.x, current.y - 1, steps)
                if(current.value > n) return current.value
            } while(steps.containsKey("${current.x - 1}x${current.y}"))

            // go left till you can go down
            do {
                current = P(current.x - 1, current.y, steps)
                if(current.value > n) return current.value
            } while(steps.containsKey("${current.x}x${current.y + 1}"))

            // go down till you can go right
            do {
                current = P(current.x, current.y + 1, steps)
                if(current.value > n) return current.value
            } while(steps.containsKey("${current.x + 1}x${current.y}"))

            // repeat!
        }
    }

    fun getStepsFromMiddle(position:Position):Int {
        val ring = position.ring
        val start = max(0, ring.index - 1)
        val increment = ring.size / 4

        val middles = arrayOf(start,start + increment,start + 2 * increment, start + 3 * increment)
        return middles.map{n -> abs(position.rollingIndex - n) }.min()!!
    }

    fun getRing(n:Int):Ring {
        val ringIndex = getRingIndex(n)
        return rings[ringIndex]
    }

    fun getRingIndex(n:Int): Int {
        var max = 0
        var i = 0
        while(max < n) {
            if(i == 0) {
                rings.add(Ring(1, 1, 1, 0, i)) // side length special case
                max = 1
            } else {
                val sideLength = (i * 2) - 1
                val size = (sideLength * 4) + 4 // 4 sides, 4 corners
                max = rings[i - 1].max
                rings.add(Ring(max + 1, max + size, size, sideLength, i))
                max += size
            }
            i++
        }
        return i - 1
    }

    fun getPosition(n:Int):Position {
        val ring = getRing(n)
        return Position(n - ring.min, ring)
    }

    data class Move(val position:Position, val direction:Direction)
    fun move(n:Int):Move {
        return move(getPosition(n))
    }

    fun move(current:Position):Move {
        if(current.ring.sideLength == 0) {
            return Move(current, Direction.NONE)
        }
        if(current.rollingIndex <= current.ring.sideLength) {
            if(current.rollingIndex == current.ring.sideLength) {
                return Move(Position(current.rollingIndex + 1, current.ring), Direction.LEFT)
            }
            return Move(Position(max(0, current.rollingIndex - 1), rings[current.ring.index - 1]), Direction.LEFT)
        }

        if(current.rollingIndex <= current.ring.sideLength * 2 + 1) {
            if(current.rollingIndex == current.ring.sideLength * 2 + 1) {
                return Move(Position(current.rollingIndex + 1, current.ring), Direction.DOWN)
            }
            return Move(Position(max(0, current.rollingIndex - 5), rings[current.ring.index - 1]), Direction.DOWN)
        }
        if(current.rollingIndex <= current.ring.sideLength * 3 + 2) {
            if(current.rollingIndex === current.ring.sideLength * 3 + 2) {
                return Move(Position(current.rollingIndex + 1, current.ring), Direction.RIGHT)
            }
            return Move(Position(max(0, current.rollingIndex - 5), rings[current.ring.index - 1]), Direction.RIGHT)
        }
        if(current.rollingIndex === current.ring.sideLength * 4 + 3) {
            return Move(Position(current.rollingIndex - 1, current.ring), Direction.UP)
        }
        return Move(Position(max(0, current.rollingIndex - 7), rings[current.ring.index - 1]), Direction.UP)
    }

    enum class Direction {
        UP,
        DOWN,
        LEFT,
        RIGHT,
        NONE
    }

}