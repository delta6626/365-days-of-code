# A Manim script to animate the derivation of three key trigonometric identities:
# Author: https://github.com/delta6626

# sin^2(x) + cos^2(x) = 1
# 1 + tan^2(x) = sec^2(x)
# 1 + cot^2(x) = cosec^2(x)

from manim import *

class Animation(Scene):
    def construct(self):

        # Vertices of the right triangle
        A = ORIGIN                  # Point at (0,0)
        B = UP * 2                 # Point at (0,2)
        C = RIGHT * 2              # Point at (2,0)

        # Create the right triangle
        rightTriangle = Polygon(A, B, C)
        rightAngle = RightAngle(Line(A, B), Line(A, C))

        self.play(Create(rightTriangle))
        self.play(Create(rightAngle))