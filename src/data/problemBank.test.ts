import { describe, it, expect } from 'vitest';
import { problemBank, getProblemById, defaultProblem } from './problemBank';
import { syllabusData } from './syllabusData';
import { validateAnswer } from '../utils/mathValidation';

describe('problemBank integrity', () => {
  it('contains valid and complete problem definitions', () => {
    const problemEntries = Object.entries(problemBank);
    expect(problemEntries.length).toBeGreaterThanOrEqual(6);

    for (const [id, problem] of problemEntries) {
      expect(problem.id).toBeDefined();
      expect(problem.title).toBeTruthy();
      expect(problem.statement).toBeTruthy();
      expect(problem.xpReward).toBeGreaterThan(0);
      expect(problem.steps.length).toBeGreaterThan(0);

      // Verify each step structure
      problem.steps.forEach((step, index) => {
        expect(step.id).toBeTruthy();
        expect(step.step_number).toBe(index + 1);
        expect(step.title).toBeTruthy();
        expect(step.instruction).toBeTruthy();
        expect(step.student_task).toBeTruthy();
        expect(step.expected_answer).toBeTruthy();

        // Verify the expected answer matches itself with validateAnswer
        const expectedAnswers = Array.isArray(step.expected_answer)
          ? step.expected_answer
          : [step.expected_answer];
        expect(expectedAnswers.length).toBeGreaterThan(0);
        expect(validateAnswer(expectedAnswers[0], step)).toBe(true);
      });
    }
  });

  it('safely resolves problems and falls back to defaultProblem', () => {
    expect(getProblemById(undefined)).toBe(defaultProblem);
    expect(getProblemById('non_existent_id')).toBe(defaultProblem);
    expect(getProblemById('quad_roots_factorization').id).toBe('quad_roots_factorization');
    expect(getProblemById('class10_right_triangle_abc').id).toBe('class10_right_triangle_abc');
  });
});

describe('syllabusData node mappings', () => {
  it('resolves every mapped node problemId to a real problem in problemBank', () => {
    syllabusData.forEach((unit) => {
      unit.nodes.forEach((node) => {
        if (node.problemId) {
          const resolved = problemBank[node.problemId];
          expect(
            resolved,
            `Node ${node.id} (${node.title}) has invalid problemId "${node.problemId}"`
          ).toBeDefined();
        }
      });
    });
  });

  it('correctly maps specific syllabus nodes to their respective curriculum problems', () => {
    const allNodes = syllabusData.flatMap((u) => u.nodes);

    const factorizationNode = allNodes.find((n) => n.id === 'node-1-2');
    expect(factorizationNode?.problemId).toBe('quad_roots_factorization');
    expect(getProblemById(factorizationNode?.problemId).title).toContain('Factorization');

    const discriminantNode = allNodes.find((n) => n.id === 'node-1-4');
    expect(discriminantNode?.problemId).toBe('quad_discriminant_nature');
    expect(getProblemById(discriminantNode?.problemId).title).toContain('Discriminant');

    const trigNode = allNodes.find((n) => n.id === 'node-2-1');
    expect(trigNode?.problemId).toBe('class10_right_triangle_abc');
    expect(getProblemById(trigNode?.problemId).topic).toContain('Trigonometry');

    const tangentNode = allNodes.find((n) => n.id === 'node-3-1');
    expect(tangentNode?.problemId).toBe('class10_circle_tangent');
    expect(getProblemById(tangentNode?.problemId).topic).toContain('Circles');

    const distanceNode = allNodes.find((n) => n.id === 'node-3-3');
    expect(distanceNode?.problemId).toBe('class11_distance_formula');
    expect(getProblemById(distanceNode?.problemId).topic).toContain('Coordinate Geometry');
  });
});
