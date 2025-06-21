# A Manim script to animate the derivation of three key trigonometric identities:
# Author: https://github.com/delta6626

# sin^2(x) + cos^2(x) = 1
# 1 + tan^2(x) = sec^2(x)
# 1 + cot^2(x) = cosec^2(x)

from manim import *

class Animation(Scene):
    def construct(self):

        ########## Triangle section ##########

        A = ORIGIN          # 0,0,0
        B = UP * 3          # 3, 0, 0
        C = RIGHT * 3       # 0, 3, 0

        # Triangle
        rightTriangle = Polygon(A, B, C)
        rightTriangle.set_stroke(WHITE)

        # Lines for right angle marker
        sideAB = Line(A, B)
        sideAC = Line(A, C)

        rightAngle = RightAngle(sideAB, sideAC, length=0.3)
        rightAngle.set_stroke(WHITE)

        # Vertex labels
        vertexA = MathTex("A").next_to(A, DOWN + LEFT)
        vertexB = MathTex("B").next_to(B, UP + LEFT)
        vertexC = MathTex("C").next_to(C, DOWN + RIGHT)

        # Lines for angle x marker

        sideCB = Line(C, B)
        sideCA = Line(C, A)

        angleMarker = Angle(sideCB, sideCA, radius=0.4)
        angleLabel = MathTex("x").next_to(angleMarker, LEFT).shift(0.15*UP)

        # Text description of sides

        opposite = MathTex("opposite").next_to(A).shift(UP*1.15, LEFT*2.2)
        adjacent = MathTex("adjacent").next_to(C).shift(DOWN*0.4, LEFT* 2.7)
        hypotenuse = MathTex("hypotenuse").next_to(B).shift(RIGHT*1.2, DOWN)


        # Group everything to center it
        rightTriangleGroup = VGroup(
            rightTriangle,
            rightAngle,
            vertexA, vertexB, vertexC,
            angleMarker,
            angleLabel,
            opposite,
            adjacent,
            hypotenuse
        )

        rightTriangleGroup.move_to(ORIGIN)

        # Animations
        self.play(Create(rightTriangle))
        self.play(Create(rightAngle))
        self.play(Write(vertexA), Write(vertexB), Write(vertexC))
        self.play(Create(angleMarker), Write(angleLabel))
        self.play(Write(opposite), Write(adjacent), Write(hypotenuse))

        # Remove side labels
        self.play(FadeOut(opposite), FadeOut(adjacent), FadeOut(hypotenuse))
        rightTriangleGroup.remove(opposite, adjacent, hypotenuse)

        # Move the right triangle group to the left

        self.play(rightTriangleGroup.animate.shift(LEFT*4))
        
        ########## Trigonometric formulas ##########

        sinFormula = MathTex(r"\sin(x) = \frac{\text{opposite}}{\text{hypotenuse}}")
        sinFormulaReplaced = MathTex(r"\sin(x) = \frac{AB}{BC}")

        self.play(Write(sinFormula))
        self.play(Transform(sinFormula, sinFormulaReplaced))
        self.remove(sinFormula)
        self.play(sinFormulaReplaced.animate.shift(UP*3 + LEFT*2.5))

        cosFormula = MathTex(r"\cos(x) = \frac{\text{adjacent}}{\text{hypotenuse}}")
        cosFormulaReplaced = MathTex(r"\cos(x) = \frac{AC}{BC}")

        self.play(Write(cosFormula))
        self.play(Transform(cosFormula, cosFormulaReplaced))
        self.remove(cosFormula)
        self.play(cosFormulaReplaced.animate.shift(UP*3, RIGHT))

        tanFormula = MathTex(r"\tan(x) = \frac{\text{opposite}}{\text{adjacent}}")
        tanFormulaReplaced = MathTex(r"\tan(x) = \frac{AB}{AC}")

        self.play(Write(tanFormula))
        self.play(Transform(tanFormula, tanFormulaReplaced))
        self.remove(tanFormula)
        self.play(tanFormulaReplaced.animate.shift(UP*3, RIGHT*4.5))

        ########## Pythagoras theorem ##########

        title = Text("Pythagoras theorem: ")
        title.font_size = 40
        title.shift(UP, RIGHT)

        pythagorasTheorem = MathTex("opposite^2 + adjacent^2 = hypotenuse^2")
        replacedPythagorasTheorem = MathTex("AB^2 + AC^2 = BC^2")

        pythagorasTheorem.shift(RIGHT*2)
        replacedPythagorasTheorem.shift(RIGHT)

       
        self.play(Write(title))
        self.play(Write(pythagorasTheorem))
        self.play(Transform(pythagorasTheorem, replacedPythagorasTheorem))
        
        ########## Remove triangle and trigonometric formulas

        self.play(rightTriangleGroup.animate.shift(LEFT*10), sinFormulaReplaced.animate.shift(UP*5), cosFormulaReplaced.animate.shift(UP*5), tanFormulaReplaced.animate.shift(UP*5));
        self.remove(rightTriangleGroup, sinFormulaReplaced, cosFormulaReplaced, tanFormulaReplaced)

        ########## Align title to left, Copy formula, shift one of them up and keep the other one in the center
        self.remove(pythagorasTheorem)
        pythagorasTheoremCentered = replacedPythagorasTheorem.copy()
        self.play(title.animate.shift(LEFT*4,  + UP*2), replacedPythagorasTheorem.animate.shift(RIGHT*2, UP*3), pythagorasTheoremCentered.animate.shift(LEFT, UP))