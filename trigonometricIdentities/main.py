# A Manim script to animate the derivation of three key trigonometric identities:
# Author: https://github.com/delta6626

# sin^2(x) + cos^2(x) = 1
# 1 + tan^2(x) = sec^2(x)
# 1 + cot^2(x) = cosec^2(x)

from manim import *

class Animation(Scene):
    def construct(self):

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
        angleLabel = MathTex("x").next_to(angleMarker, LEFT).shift(0.2*UP)

        # Group everything to center it
        group = VGroup(
            rightTriangle,
            rightAngle,
            vertexA, vertexB, vertexC,
            angleMarker,
            angleLabel
        )

        group.move_to(ORIGIN)

        # Animations
        self.play(Create(rightTriangle))
        self.play(Create(rightAngle))
        self.play(Write(vertexA), Write(vertexB), Write(vertexC))
        self.play(Create(angleMarker), Write(angleLabel))

        