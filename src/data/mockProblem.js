export const mockProblem = {
  id: "class10_right_triangle_abc",
  grade: "Class 10",
  topic: "Trigonometry & Pythagoras Theorem",
  title: "Right Triangle ABC & Trigonometric Ratios",
  statement:
    "In a right triangle ABC, angle B is 90°, AB is 3 cm, and BC is 4 cm. Draw the triangle and solve the following step-by-step questions.",
  xpReward: 60,
  diagram_config: {
    diagram_id: "right_triangle_abc",
    board_config: {
      boundingbox: [-1, 5, 5, -1],
      axis: true,
      grid: false,
      showNavigation: false,
      showCopyright: false,
      keepaspectratio: true
    },
    elements: [
      {
        id: "pB",
        type: "point",
        parents: [[0, 0]],
        attributes: { name: "B (0,0)", fixed: true, size: 3, color: "#2563eb" }
      },
      {
        id: "pA",
        type: "point",
        parents: [[0, 3]],
        attributes: { name: "A (0,3)", fixed: true, size: 3, color: "#2563eb" }
      },
      {
        id: "pC",
        type: "point",
        parents: [[4, 0]],
        attributes: { name: "C (4,0)", fixed: true, size: 3, color: "#2563eb" }
      },
      {
        id: "triABC",
        type: "polygon",
        parents: ["pA", "pB", "pC"],
        attributes: {
          borders: { strokeColor: "#3b82f6", strokeWidth: 2.5 },
          fillColor: "#eff6ff",
          fillOpacity: 0.5
        }
      },
      {
        id: "angleB",
        type: "angle",
        parents: ["pC", "pB", "pA"],
        attributes: {
          radius: 0.5,
          fillColor: "#ef4444",
          name: "90°",
          strokeColor: "#dc2626"
        }
      }
    ]
  },
  steps: [
    {
      id: "step-1",
      step_number: 1,
      title: "Find Hypotenuse AC",
      instruction:
        "In right triangle ABC with ∠B = 90°, side AB is perpendicular to BC. Apply the Pythagorean Theorem to find the hypotenuse AC.",
      latex_equation: "AC^2 = AB^2 + BC^2 = 3^2 + 4^2 = 9 + 16 = 25",
      student_task: "Calculate the exact length of hypotenuse AC (in cm):",
      expected_answer: ["5", "5 cm", "5cm"],
      unit: "cm",
      hint: "Take the principal square root of 25: \\sqrt{25} = 5.",
      explanation: "By Pythagoras Theorem: AC = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\text{ cm}.",
      keypad_shortcuts: ["5", "√", "cm"]
    },
    {
      id: "step-2",
      step_number: 2,
      title: "Evaluate sin(C)",
      instruction:
        "For acute angle C at vertex (4,0), side AB (3 cm) is the opposite side and AC (5 cm) is the hypotenuse.",
      latex_equation: "\\sin(C) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{AB}{AC}",
      student_task: "Find the value of \\sin(C) as a fraction (e.g. 3/5) or decimal:",
      expected_answer: ["3/5", "0.6", "3 / 5", ".6"],
      hint: "Substitute AB = 3 and AC = 5 into the ratio \\frac{AB}{AC}.",
      explanation: "\\sin(C) = \\frac{3}{5} = 0.6.",
      keypad_shortcuts: ["3/5", "0.6", "/"]
    },
    {
      id: "step-3",
      step_number: 3,
      title: "Evaluate tan(A)",
      instruction:
        "Now look at acute angle A at vertex (0,3). Side BC (4 cm) is the opposite side and side AB (3 cm) is the adjacent side.",
      latex_equation: "\\tan(A) = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{BC}{AB}",
      student_task: "What is the value of \\tan(A)?",
      expected_answer: ["4/3", "4 / 3", "1.33", "1.333", "1.34"],
      hint: "The side opposite to angle A is BC (4 cm), and the adjacent side is AB (3 cm).",
      explanation: "\\tan(A) = \\frac{BC}{AB} = \\frac{4}{3} \\approx 1.33.",
      keypad_shortcuts: ["4/3", "1.33", "/"]
    }
  ]
};

export const sampleProblems = [
  mockProblem,
  {
    id: "class10_circle_tangent",
    grade: "Class 10",
    topic: "Circles & Tangents",
    title: "Tangent Length from an External Point",
    statement:
      "A circle has center O at (0,0) and radius r = 3 cm. A tangent PT touches the circle at point T(0,3) from external point P(4,3). Find the length of tangent PT.",
    xpReward: 50,
    diagram_config: {
      diagram_id: "circle_tangent_p",
      board_config: {
        boundingbox: [-2, 5, 6, -2],
        axis: true,
        grid: false,
        showNavigation: false,
        showCopyright: false,
        keepaspectratio: true
      },
      elements: [
        {
          id: "pO",
          type: "point",
          parents: [[0, 0]],
          attributes: { name: "O (0,0)", fixed: true, size: 3, color: "#1e293b" }
        },
        {
          id: "circ",
          type: "circle",
          parents: ["pO", 3],
          attributes: { strokeColor: "#0284c7", strokeWidth: 2, fillColor: "#f0f9ff", fillOpacity: 0.3 }
        },
        {
          id: "pT",
          type: "point",
          parents: [[0, 3]],
          attributes: { name: "T (0,3)", fixed: true, size: 3, color: "#0284c7" }
        },
        {
          id: "pP",
          type: "point",
          parents: [[4, 3]],
          attributes: { name: "P (4,3)", fixed: true, size: 3, color: "#ef4444" }
        },
        {
          id: "segOT",
          type: "segment",
          parents: ["pO", "pT"],
          attributes: { strokeColor: "#0284c7", strokeWidth: 2, dash: 2 }
        },
        {
          id: "segPT",
          type: "segment",
          parents: ["pP", "pT"],
          attributes: { strokeColor: "#16a34a", strokeWidth: 3 }
        },
        {
          id: "segOP",
          type: "segment",
          parents: ["pO", "pP"],
          attributes: { strokeColor: "#64748b", strokeWidth: 1.5, dash: 3 }
        }
      ]
    },
    steps: [
      {
        id: "tangent-step-1",
        step_number: 1,
        title: "Radius-Tangent Perpendicularity",
        instruction:
          "By the fundamental Circle Theorem, the tangent at any point of a circle is perpendicular to the radius through the point of contact.",
        latex_equation: "\\angle OTP = 90^\\circ \\implies \\triangle OTP \\text{ is a right triangle}",
        student_task: "What is the angle between radius OT and tangent line PT in degrees?",
        expected_answer: ["90", "90°", "90 deg", "90 degrees"],
        unit: "°",
        hint: "Radius meeting tangent at the point of contact forms a right angle.",
        explanation: "The angle between radius and tangent at point of contact is always 90°.",
        keypad_shortcuts: ["90", "°"]
      },
      {
        id: "tangent-step-2",
        step_number: 2,
        title: "Calculate Tangent Length PT",
        instruction:
          "Since T is at (0,3) and P is at (4,3), notice the horizontal segment along y = 3.",
        latex_equation: "PT = |x_P - x_T| = |4 - 0| = 4\\text{ cm}",
        student_task: "What is the length of tangent PT in cm?",
        expected_answer: ["4", "4 cm", "4cm"],
        unit: "cm",
        hint: "Distance between (0,3) and (4,3) is 4 - 0 = 4.",
        explanation: "The tangent length PT is 4 cm.",
        keypad_shortcuts: ["4", "cm"]
      }
    ]
  },
  {
    id: "class11_distance_formula",
    grade: "Class 11",
    topic: "Coordinate Geometry",
    title: "Distance Between Two Points & Collinearity",
    statement:
      "Given points P(1, 1) and Q(4, 5) on the Cartesian plane, find the straight-line distance PQ using the distance formula.",
    xpReward: 50,
    diagram_config: {
      diagram_id: "distance_formula_pq",
      board_config: {
        boundingbox: [-1, 6, 6, -1],
        axis: true,
        grid: true,
        showNavigation: false,
        showCopyright: false,
        keepaspectratio: true
      },
      elements: [
        {
          id: "pP",
          type: "point",
          parents: [[1, 1]],
          attributes: { name: "P (1,1)", fixed: true, size: 3, color: "#6366f1" }
        },
        {
          id: "pQ",
          type: "point",
          parents: [[4, 5]],
          attributes: { name: "Q (4,5)", fixed: true, size: 3, color: "#6366f1" }
        },
        {
          id: "segPQ",
          type: "segment",
          parents: ["pP", "pQ"],
          attributes: { strokeColor: "#4f46e5", strokeWidth: 3 }
        },
        {
          id: "pR",
          type: "point",
          parents: [[4, 1]],
          attributes: { name: "R (4,1)", fixed: true, size: 2, color: "#94a3b8" }
        },
        {
          id: "segPR",
          type: "segment",
          parents: ["pP", "pR"],
          attributes: { strokeColor: "#94a3b8", strokeWidth: 1.5, dash: 2 }
        },
        {
          id: "segQR",
          type: "segment",
          parents: ["pQ", "pR"],
          attributes: { strokeColor: "#94a3b8", strokeWidth: 1.5, dash: 2 }
        }
      ]
    },
    steps: [
      {
        id: "dist-step-1",
        step_number: 1,
        title: "Compute Coordinate Differences",
        instruction:
          "Calculate horizontal change \\Delta x = x_2 - x_1 and vertical change \\Delta y = y_2 - y_1.",
        latex_equation: "\\Delta x = 4 - 1 = 3, \\quad \\Delta y = 5 - 1 = 4",
        student_task: "What is \\Delta x^2 + \\Delta y^2?",
        expected_answer: ["25"],
        hint: "3^2 + 4^2 = 9 + 16 = 25.",
        explanation: "The sum of squared differences is 9 + 16 = 25.",
        keypad_shortcuts: ["25"]
      },
      {
        id: "dist-step-2",
        step_number: 2,
        title: "Apply Distance Formula",
        instruction:
          "Take the square root to determine distance d(P, Q).",
        latex_equation: "d(P, Q) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \\sqrt{25}",
        student_task: "What is the distance between P and Q?",
        expected_answer: ["5", "5 units"],
        hint: "\\sqrt{25} = 5.",
        explanation: "The distance d(P, Q) = 5 units.",
        keypad_shortcuts: ["5"]
      }
    ]
  }
];

export default mockProblem;
