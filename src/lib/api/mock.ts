/**
 * Mock API for SIMVEX
 *
 * Provides realistic mock data matching the backend OpenAPI spec.
 * Used for development and testing without backend dependency.
 *
 * Aligned with: https://3rd-backend-production.up.railway.app/api/openapi.json
 */

import type {
  ModelListItem,
  ModelDetail,
  ChatSessionResponse,
  ChatMessageResponse,
  StudyNoteResponse,
} from "@/types/api";

/**
 * Simulate network delay
 */
async function delay(ms?: number): Promise<void> {
  const randomDelay = ms ?? Math.random() * 300 + 200; // 200-500ms
  await new Promise((resolve) => setTimeout(resolve, randomDelay));
}

/**
 * Mock data storage
 */
const mockData = {
  models: [
    {
      id: 3,
      name: "Machine Vice",
      thumbnail_url: "/models/machine-vice/thumbnail.jpg",
    },
    {
      id: 4,
      name: "Drone",
      thumbnail_url: "/models/Drone/thumbnail.jpg",
    },
    {
      id: 5,
      name: "Robot Gripper",
      thumbnail_url: "/models/robot-gripper/thumbnail.jpg",
    },
    {
      id: 6,
      name: "Suspension",
      thumbnail_url: "/models/Suspension/thumbnail.jpg",
    },
    {
      id: 7,
      name: "Leaf Spring",
      thumbnail_url: "/models/leaf-spring/thumbnail.jpg",
    },
    {
      id: 1,
      name: "V4 Engine",
      thumbnail_url: "/models/v4-engine/thumbnail.jpg",
    },
    {
      id: 2,
      name: "Robot Arm",
      thumbnail_url: "/models/robot-arm/thumbnail.jpg",
    },
  ] as ModelListItem[],

  modelDetails: {
    1: {
      id: 1,
      name: "V4 Engine",
      thumbnail_url: "/models/v4-engine/thumbnail.jpg",
      file_url: "/models/v4-engine/v4-engine.obj",
      parts: [
        {
          id: 101,
          model_id: 1,
          name: "Crankshaft",
          description:
            "Converts reciprocating motion of pistons into rotational motion",
          material: "Forged Steel",
          metadata: { weight_kg: 12.5, max_rpm: 7000, bearing_count: 5 },
          mesh_names: [
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "110",
          ],
          geometry: {
            id: 1001,
            part_id: 101,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 102,
          model_id: 1,
          name: "Piston 1",
          description: "First cylinder piston assembly with rings",
          material: "Aluminum Alloy",
          metadata: {
            weight_kg: 0.35,
            diameter_mm: 86,
            stroke_mm: 90,
            compression_ratio: 10.5,
          },
          mesh_names: [
            "111",
            "112",
            "113",
            "114",
            "115",
            "116",
            "117",
            "118",
            "119",
            "120",
          ],
          geometry: {
            id: 1002,
            part_id: 102,
            initial_pos: { x: -0.5, y: 0.8, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: -1.5, y: 2.5, z: 0 },
          },
        },
        {
          id: 103,
          model_id: 1,
          name: "Piston 2",
          description: "Second cylinder piston assembly",
          material: "Aluminum Alloy",
          metadata: {
            weight_kg: 0.35,
            diameter_mm: 86,
            stroke_mm: 90,
            compression_ratio: 10.5,
          },
          mesh_names: [
            "121",
            "122",
            "123",
            "124",
            "125",
            "126",
            "127",
            "128",
            "129",
            "130",
          ],
          geometry: {
            id: 1003,
            part_id: 103,
            initial_pos: { x: 0.5, y: 0.8, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 1.5, y: 2.5, z: 0 },
          },
        },
        {
          id: 104,
          model_id: 1,
          name: "Cylinder Head",
          description: "Houses valves, camshafts, and combustion chambers",
          material: "Cast Aluminum",
          metadata: { weight_kg: 8.2, valve_count: 16, camshaft_count: 2 },
          mesh_names: ["131", "132", "133", "134", "135", "136", "137"],
          geometry: {
            id: 1004,
            part_id: 104,
            initial_pos: { x: 0, y: 1.5, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 3.5, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    2: {
      id: 2,
      name: "Robot Arm",
      thumbnail_url: "/models/robot-arm/thumbnail.jpg",
      file_url: "/models/robot-arm/robot-arm.obj",
      parts: [
        {
          id: 201,
          model_id: 2,
          name: "Base",
          description: "Stationary base platform with mounting holes",
          material: "Cast Aluminum",
          metadata: { weight_kg: 12.0, mounting_bolts: 6 },
          mesh_names: [
            "Solid11",
            "Solid12",
            "Solid13",
            "Solid14",
            "Solid15",
            "Solid16",
            "Solid17",
            "Solid18",
            "Solid19",
            "Solid21",
          ],
          geometry: {
            id: 2001,
            part_id: 201,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 202,
          model_id: 2,
          name: "Shoulder Joint",
          description: "Primary rotation joint with servo motor",
          material: "Hardened Steel",
          metadata: { weight_kg: 5.4, max_torque_nm: 120 },
          mesh_names: [
            "Solid121",
            "Solid122",
            "Solid123",
            "Solid124",
            "Solid125",
            "Solid126",
            "Solid127",
            "Solid131",
            "Solid132",
            "Solid133",
          ],
          geometry: {
            id: 2002,
            part_id: 202,
            initial_pos: { x: 0, y: 1, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 3, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    3: {
      id: 3,
      name: "Machine Vice",
      thumbnail_url: "/models/machine-vice/thumbnail.jpg",
      file_url: "/models/machine-vice/machine-vice.obj",
      parts: [
        {
          id: 301,
          model_id: 3,
          name: "Part1 Fuhrung",
          description: "Guide rail",
          material: "Steel",
          metadata: { weight_kg: 0.8, length_mm: 180, hardness_hrc: 58 },
          mesh_names: ["Solid11", "Solid14", "Solid15"],
          geometry: {
            id: 3001,
            part_id: 301,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: -2, y: 0, z: 0 },
          },
        },
        {
          id: 302,
          model_id: 3,
          name: "Part2 Feste Backe",
          description: "Fixed jaw",
          material: "Cast Iron",
          metadata: {
            weight_kg: 1.5,
            jaw_width_mm: 100,
            clamping_force_kn: 30,
          },
          mesh_names: ["Solid12", "Solid16"],
          geometry: {
            id: 3002,
            part_id: 302,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 2, z: 0 },
          },
        },
        {
          id: 303,
          model_id: 3,
          name: "Part3-lose backe",
          description: "Movable jaw",
          material: "Cast Iron",
          metadata: { weight_kg: 1.2, jaw_width_mm: 100, travel_mm: 80 },
          mesh_names: ["Solid13", "Solid19"],
          geometry: {
            id: 3003,
            part_id: 303,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 2, y: 0, z: 0 },
          },
        },
        {
          id: 304,
          model_id: 3,
          name: "Part7-TrapezSpindel",
          description: "Trapezoidal spindle",
          material: "Steel",
          metadata: { weight_kg: 0.6, thread_pitch_mm: 3, diameter_mm: 16 },
          mesh_names: ["Solid17", "Solid110", "Solid111"],
          geometry: {
            id: 3004,
            part_id: 304,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 305,
          model_id: 3,
          name: "Part8-grundplatte",
          description: "Base plate",
          material: "Cast Iron",
          metadata: { weight_kg: 3.8, length_mm: 220, width_mm: 100 },
          mesh_names: ["Solid18", "Solid112"],
          geometry: {
            id: 3005,
            part_id: 305,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -3, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    4: {
      id: 4,
      name: "Drone",
      thumbnail_url: "/models/Drone/thumbnail.jpg",
      file_url: "/models/Drone/drone.obj",
      parts: [
        {
          id: 401,
          model_id: 4,
          name: "Main frame",
          description: "Central drone body frame",
          material: "Carbon Fiber",
          metadata: {
            weight_kg: 0.45,
            dimensions_mm: "250x250x40",
            motor_mounts: 4,
          },
          mesh_names: ["Solid11", "Solid12", "Solid13", "Solid14", "Solid15"],
          geometry: {
            id: 4001,
            part_id: 401,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 0, z: 0 },
          },
        },
        {
          id: 402,
          model_id: 4,
          name: "Arm gear",
          description: "Motor arm gear mechanism",
          material: "Aluminum",
          metadata: { weight_kg: 0.12, gear_ratio: "3:1", teeth_count: 24 },
          mesh_names: ["Solid16", "Solid17", "Solid18", "Solid19", "Solid110"],
          geometry: {
            id: 4002,
            part_id: 402,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 2, y: 1, z: 0 },
          },
        },
        {
          id: 403,
          model_id: 4,
          name: "Impellar Blade",
          description: "Propeller blade assembly",
          material: "ABS Plastic",
          metadata: {
            weight_kg: 0.02,
            diameter_mm: 127,
            blade_count: 2,
            max_rpm: 12000,
          },
          mesh_names: [
            "Solid111",
            "Solid112",
            "Solid113",
            "Solid114",
            "Solid115",
          ],
          geometry: {
            id: 4003,
            part_id: 403,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 3, z: 0 },
          },
        },
        {
          id: 404,
          model_id: 4,
          name: "Leg",
          description: "Landing leg",
          material: "Carbon Fiber",
          metadata: { weight_kg: 0.03, height_mm: 65, shock_absorbing: true },
          mesh_names: ["Solid116", "Solid117", "Solid118", "Solid119"],
          geometry: {
            id: 4004,
            part_id: 404,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 405,
          model_id: 4,
          name: "Gearing",
          description: "Internal gear train",
          material: "Steel",
          metadata: { weight_kg: 0.08, gear_ratio: "5:1", module: 0.5 },
          mesh_names: [
            "Solid121",
            "Solid122",
            "Solid123",
            "Solid124",
            "Solid125",
            "Solid126",
            "Solid127",
            "Solid128",
            "Solid129",
            "Solid130",
            "Solid131",
            "Solid132",
            "Solid133",
            "Solid134",
          ],
          geometry: {
            id: 4005,
            part_id: 405,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: -2, y: 1, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    5: {
      id: 5,
      name: "Robot Gripper",
      thumbnail_url: "/models/robot-gripper/thumbnail.jpg",
      file_url: "/models/robot-gripper/robot-gripper.obj",
      parts: [
        {
          id: 501,
          model_id: 5,
          name: "Base Plate",
          description: "Gripper mounting base",
          material: "Aluminum",
          metadata: { weight_kg: 0.35, thickness_mm: 8, mounting_holes: 4 },
          mesh_names: ["Solid11", "Solid12", "Solid13", "Solid14"],
          geometry: {
            id: 5001,
            part_id: 501,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 502,
          model_id: 5,
          name: "Base Gear",
          description: "Drive gear mechanism",
          material: "Steel",
          metadata: { weight_kg: 0.18, teeth_count: 32, module: 1.0 },
          mesh_names: ["Solid15", "Solid16", "Solid17", "Solid18", "Solid19"],
          geometry: {
            id: 5002,
            part_id: 502,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -1, z: 0 },
          },
        },
        {
          id: 503,
          model_id: 5,
          name: "Gripper",
          description: "Gripper finger assembly",
          material: "Hardened Steel",
          metadata: { weight_kg: 0.15, grip_force_n: 80, stroke_mm: 40 },
          mesh_names: [
            "Solid110",
            "Solid111",
            "Solid112",
            "Solid113",
            "Solid114",
          ],
          geometry: {
            id: 5003,
            part_id: 503,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 2, z: 0 },
          },
        },
        {
          id: 504,
          model_id: 5,
          name: "Link",
          description: "Connecting linkage",
          material: "Steel",
          metadata: { weight_kg: 0.08, length_mm: 60, pin_diameter_mm: 5 },
          mesh_names: [
            "Solid115",
            "Solid116",
            "Solid117",
            "Solid118",
            "Solid119",
          ],
          geometry: {
            id: 5004,
            part_id: 504,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 1, y: 1, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    6: {
      id: 6,
      name: "Suspension",
      thumbnail_url: "/models/Suspension/thumbnail.jpg",
      file_url: "/models/Suspension/suspension.obj",
      parts: [
        {
          id: 601,
          model_id: 6,
          name: "BASE",
          description: "Suspension mount base",
          material: "Steel",
          metadata: {
            weight_kg: 2.1,
            bolt_pattern_mm: "4x100",
            thickness_mm: 12,
          },
          mesh_names: ["Solid11"],
          geometry: {
            id: 6001,
            part_id: 601,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: -2, z: 0 },
          },
        },
        {
          id: 602,
          model_id: 6,
          name: "SPRING",
          description: "Coil spring",
          material: "Spring Steel",
          metadata: {
            weight_kg: 1.8,
            spring_rate_n_mm: 35,
            free_length_mm: 300,
            coil_count: 8,
          },
          mesh_names: ["Solid12", "Solid121"],
          geometry: {
            id: 6002,
            part_id: 602,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 2, z: 0 },
          },
        },
        {
          id: 603,
          model_id: 6,
          name: "ROD",
          description: "Damper rod",
          material: "Chrome Steel",
          metadata: { weight_kg: 0.5, diameter_mm: 22, stroke_mm: 150 },
          mesh_names: ["Solid13"],
          geometry: {
            id: 6003,
            part_id: 603,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 3, z: 0 },
          },
        },
        {
          id: 604,
          model_id: 6,
          name: "NUT",
          description: "Lock nut",
          material: "Steel",
          metadata: {
            weight_kg: 0.05,
            thread_size: "M22x1.5",
            wrench_size_mm: 32,
          },
          mesh_names: ["Solid14"],
          geometry: {
            id: 6004,
            part_id: 604,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 4, z: 0 },
          },
        },
      ],
    } as ModelDetail,

    7: {
      id: 7,
      name: "Leaf Spring",
      thumbnail_url: "/models/leaf-spring/thumbnail.jpg",
      file_url: "/models/leaf-spring/leaf-spring.obj",
      parts: [
        {
          id: 701,
          model_id: 7,
          name: "Leaf-Layer",
          description: "Multi-layered spring blade",
          material: "Spring Steel",
          metadata: {
            weight_kg: 4.5,
            leaf_count: 5,
            length_mm: 1200,
            width_mm: 70,
          },
          mesh_names: [
            "Solid11",
            "Solid12",
            "Solid13",
            "Solid14",
            "Solid15",
            "Solid16",
            "Solid17",
          ],
          geometry: {
            id: 7001,
            part_id: 701,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 2, z: 0 },
          },
        },
        {
          id: 702,
          model_id: 7,
          name: "Clamp-Center",
          description: "Center clamp bolt assembly",
          material: "Steel",
          metadata: { weight_kg: 0.6, bolt_size: "M16", torque_nm: 120 },
          mesh_names: [
            "Solid121",
            "Solid122",
            "Solid123",
            "Solid124",
            "Solid125",
          ],
          geometry: {
            id: 7002,
            part_id: 702,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 0, y: 3, z: 0 },
          },
        },
        {
          id: 703,
          model_id: 7,
          name: "Support-Chassis",
          description: "Chassis mount support",
          material: "Cast Iron",
          metadata: { weight_kg: 1.8, bolt_holes: 2, load_capacity_kg: 500 },
          mesh_names: ["Solid21", "Solid22", "Solid23"],
          geometry: {
            id: 7003,
            part_id: 703,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: -2, y: 0, z: 0 },
          },
        },
        {
          id: 704,
          model_id: 7,
          name: "Support-Rubber",
          description: "Rubber bushing mount",
          material: "Rubber/Steel",
          metadata: {
            weight_kg: 0.3,
            shore_hardness: 70,
            inner_diameter_mm: 16,
          },
          mesh_names: ["Solid221", "Solid231"],
          geometry: {
            id: 7004,
            part_id: 704,
            initial_pos: { x: 0, y: 0, z: 0 },
            initial_rot: { x: 0, y: 0, z: 0 },
            initial_scale: { x: 1, y: 1, z: 1 },
            exploded_pos: { x: 2, y: 0, z: 0 },
          },
        },
      ],
    } as ModelDetail,
  } as Record<number, ModelDetail>,

  chatSessions: [
    {
      id: 1,
      user_id: "user-1",
      model_id: 1,
      title: "Understanding Engine Timing",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 2,
      user_id: "user-1",
      model_id: 1,
      title: "Combustion Process",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ] as ChatSessionResponse[],

  chatMessages: {
    1: [
      {
        id: 1,
        session_id: 1,
        role: "user",
        content: "How does the timing belt work?",
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 2,
        session_id: 1,
        role: "assistant",
        content:
          "The timing belt synchronizes the rotation of the crankshaft and camshaft. This ensures the engine valves open and close at the correct times relative to piston position.",
        created_at: new Date(Date.now() - 86300000).toISOString(),
      },
    ] as ChatMessageResponse[],
    2: [
      {
        id: 3,
        session_id: 2,
        role: "user",
        content: "Explain the four-stroke cycle",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 4,
        session_id: 2,
        role: "assistant",
        content:
          "The four-stroke cycle consists of:\n1. **Intake**: Air-fuel mixture enters\n2. **Compression**: Mixture compressed\n3. **Power**: Spark ignites mixture\n4. **Exhaust**: Burnt gases expelled",
        created_at: new Date(Date.now() - 3500000).toISOString(),
      },
    ] as ChatMessageResponse[],
  } as Record<number, ChatMessageResponse[]>,

  notes: [
    {
      id: 1,
      user_id: "user-1",
      model_id: 1,
      part_id: 101,
      content:
        "Key component - converts linear to rotational motion. 5 main bearings support the shaft.",
      updated_at: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 2,
      user_id: "user-1",
      model_id: 1,
      part_id: null,
      content:
        "Overall engine notes:\n- 4 cylinders\n- DOHC design\n- ~2.0L displacement",
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ] as StudyNoteResponse[],
};

/**
 * Generate unique IDs
 */
let sessionIdCounter = 100;
let messageIdCounter = 1000;
let noteIdCounter = 100;
// Maps "modelId:partName" → noteId for string-based part lookups (mesh names)
const _partNameToNoteId = new Map<string, number>();

/**
 * Mock Models API
 */
export const mockModelsApi = {
  list: async (): Promise<ModelListItem[]> => {
    await delay();
    return [...mockData.models];
  },

  getDetail: async (id: number | string): Promise<ModelDetail> => {
    await delay();
    const numericId = Number(id);
    const model = mockData.modelDetails[numericId];
    if (!model) {
      throw new Error(`Model not found: ${id}`);
    }
    return JSON.parse(JSON.stringify(model)); // Deep clone
  },
};

/**
 * Mock Chat API
 */
export const mockChatApi = {
  createSession: async (
    modelId: number | string,
    title?: string
  ): Promise<ChatSessionResponse> => {
    await delay();

    const session: ChatSessionResponse = {
      id: ++sessionIdCounter,
      user_id: "user-1",
      model_id: Number(modelId),
      title: title || `New Chat ${mockData.chatSessions.length + 1}`,
      created_at: new Date().toISOString(),
    };

    mockData.chatSessions.push(session);
    mockData.chatMessages[session.id] = [];

    return session;
  },

  /**
   * Stream chat message - matches backend SSE format: `data: {text}\n\n`
   */
  streamMessage: async (
    sessionId: number | string,
    content: string,
    _options?: { n?: number; signal?: AbortSignal }
  ): Promise<ReadableStreamDefaultReader<Uint8Array>> => {
    await delay(100);

    const numericSessionId = Number(sessionId);

    // Add user message
    const userMessage: ChatMessageResponse = {
      id: ++messageIdCounter,
      session_id: numericSessionId,
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    if (!mockData.chatMessages[numericSessionId]) {
      mockData.chatMessages[numericSessionId] = [];
    }
    mockData.chatMessages[numericSessionId].push(userMessage);

    // Generate assistant response chunks (plain text, matching backend format)
    const chunks = [
      "좋은 질문이에요! 이 부품의 작동 원리를 설명해 드릴게요.\n\n",
      "## 핵심 구성 요소\n\n",
      "엔진은 **네 가지 주요 부품**으로 구성됩니다:\n\n",
      "1. **크랭크샤프트** — 직선 운동을 회전 운동으로 변환\n",
      "2. **피스톤** — 왕복 압축 사이클 수행\n",
      "3. **실린더 헤드** — 밸브와 캠샤프트 수용\n",
      "4. **커넥팅 로드** — 피스톤과 크랭크샤프트 연결\n\n",
      "### 운동 방정식\n\n",
      "피스톤의 왕복 운동은 뉴턴의 제2법칙을 따릅니다:\n\n",
      "$$F = ma = m \\cdot \\frac{d^2x}{dt^2}$$\n\n",
      "여기서 토크는 다음과 같이 계산됩니다:\n\n",
      "$$\\tau = r \\times F = rF\\sin\\theta$$\n\n",
      "> 타이밍 벨트가 크랭크샤프트와 캠샤프트의 회전을 동기화합니다.\n\n",
      "이를 통해 *최적의 밸브 타이밍*으로 효율을 극대화합니다.",
    ];

    const encoder = new TextEncoder();
    const assistantContent: string[] = [];

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (const chunk of chunks) {
          await delay(150);
          assistantContent.push(chunk);
          // SSE multi-line format: each line gets its own data: prefix
          const lines = chunk.split("\n");
          const sseData = lines.map((l) => `data: ${l}`).join("\n") + "\n\n";
          controller.enqueue(encoder.encode(sseData));
        }

        // Store complete assistant message
        const assistantMessage: ChatMessageResponse = {
          id: ++messageIdCounter,
          session_id: numericSessionId,
          role: "assistant",
          content: assistantContent.join(""),
          created_at: new Date().toISOString(),
        };
        mockData.chatMessages[numericSessionId].push(assistantMessage);

        // Signal end of stream
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return stream.getReader();
  },

  listSessions: async (
    modelId?: number | string
  ): Promise<ChatSessionResponse[]> => {
    await delay();
    let sessions = [...mockData.chatSessions];

    if (modelId != null) {
      const numericModelId = Number(modelId);
      sessions = sessions.filter((s) => s.model_id === numericModelId);
    }

    return sessions.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getMessages: async (
    sessionId: number | string,
    limit = 20,
    skip = 0
  ): Promise<ChatMessageResponse[]> => {
    await delay();

    const numericSessionId = Number(sessionId);
    const messages = mockData.chatMessages[numericSessionId] || [];
    return messages
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(skip, skip + limit);
  },

  /**
   * Delete a chat session (matches backend 204 No Content)
   */
  deleteSession: async (sessionId: number | string): Promise<void> => {
    await delay();

    const numericSessionId = Number(sessionId);
    const index = mockData.chatSessions.findIndex(
      (s) => s.id === numericSessionId
    );
    if (index !== -1) {
      mockData.chatSessions.splice(index, 1);
      delete mockData.chatMessages[numericSessionId];
    }
  },
};

/**
 * Mock Notes API (no DELETE - matches backend)
 */
export const mockNotesApi = {
  /**
   * Get note for model or part.
   * Returns null if not found (matches backend behavior).
   */
  get: async (
    modelId: number | string,
    partId?: number | string
  ): Promise<StudyNoteResponse | null> => {
    await delay();

    const numericModelId = Number(modelId);
    const isStringPart = partId != null && isNaN(Number(partId));

    if (isStringPart) {
      // Look up by string part name (mesh name like "Crankshaft")
      const key = `${numericModelId}:${partId}`;
      const noteId = _partNameToNoteId.get(key);
      if (noteId == null) return null;
      const note = mockData.notes.find((n) => n.id === noteId);
      return note ? { ...note } : null;
    }

    const numericPartId = partId != null ? Number(partId) : null;
    const note = mockData.notes.find(
      (n) => n.model_id === numericModelId && n.part_id === numericPartId
    );
    return note ? { ...note } : null;
  },

  save: async (
    modelId: number | string,
    content: string,
    partId?: number | string
  ): Promise<StudyNoteResponse> => {
    await delay();

    const numericModelId = Number(modelId);
    const isStringPart = partId != null && isNaN(Number(partId));

    let existingIndex: number;
    if (isStringPart) {
      const key = `${numericModelId}:${partId}`;
      const noteId = _partNameToNoteId.get(key);
      existingIndex =
        noteId != null ? mockData.notes.findIndex((n) => n.id === noteId) : -1;
    } else {
      const numericPartId = partId != null ? Number(partId) : null;
      existingIndex = mockData.notes.findIndex(
        (n) => n.model_id === numericModelId && n.part_id === numericPartId
      );
    }

    const noteId =
      existingIndex >= 0 ? mockData.notes[existingIndex].id : ++noteIdCounter;

    const note: StudyNoteResponse = {
      id: noteId,
      user_id: "user-1",
      model_id: numericModelId,
      part_id: isStringPart ? null : partId != null ? Number(partId) : null,
      content,
      updated_at: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      mockData.notes[existingIndex] = note;
    } else {
      mockData.notes.push(note);
    }

    // Track string part name → note id mapping
    if (isStringPart) {
      _partNameToNoteId.set(`${numericModelId}:${partId}`, noteId);
    }

    return { ...note };
  },
};

/**
 * Mock Quiz API
 */
let quizIdCounter = 1;

/** Store generated quiz data so submit can validate answers */
const generatedQuizStore = new Map<
  number,
  {
    questions: import("@/types/api").QuizQuestionResponse[];
    correctIndices: number[];
  }
>();

export const mockQuizApi = {
  generate: async (
    modelId: number | string,
    options?: { partId?: number | string; count?: number }
  ): Promise<import("@/types/api").QuizGenerateResponse> => {
    await delay();

    const numericModelId = Number(modelId);
    const model = mockData.modelDetails[numericModelId];
    const partNames = model?.parts.map((p) => p.name ?? "Unknown") ?? ["Part"];
    const count = options?.count ?? 5;
    const quizId = ++quizIdCounter;

    const questions: import("@/types/api").QuizQuestionResponse[] = [];
    const templates = [
      {
        q: (p: string) => `${p}의 주요 재질은 무엇인가요?`,
        opts: [
          "강철 (Steel)",
          "알루미늄 합금",
          "주철 (Cast Iron)",
          "탄소 섬유",
        ],
        correct: 0,
      },
      {
        q: (p: string) => `${p}의 주요 기능은 무엇인가요?`,
        opts: ["운동 변환", "열 방출", "윤활 공급", "전기 전도"],
        correct: 0,
      },
      {
        q: (_p: string) => `이 모델의 부품 수는 몇 개인가요?`,
        opts: [
          `${partNames.length}개`,
          `${partNames.length + 2}개`,
          `${partNames.length - 1}개`,
          `${partNames.length + 5}개`,
        ],
        correct: 0,
      },
      {
        q: (p: string) => `${p}이(가) 고장나면 어떤 문제가 발생하나요?`,
        opts: ["엔진 정지", "소음 증가", "연료 누출", "온도 상승"],
        correct: 0,
      },
      {
        q: (_p: string) => `다음 중 이 모델에 포함된 부품은?`,
        opts: [partNames[0] ?? "Part A", "터보차저", "라디에이터", "머플러"],
        correct: 0,
      },
    ];

    for (let i = 0; i < Math.min(count, templates.length); i++) {
      const t = templates[i];
      const partName = partNames[i % partNames.length] ?? "Part";
      questions.push({
        id: quizId * 100 + i + 1,
        question: t.q(partName),
        type: "multiple_choice",
        options: t.opts,
      });
    }

    generatedQuizStore.set(quizId, {
      questions,
      correctIndices: templates
        .slice(0, Math.min(count, templates.length))
        .map((t) => t.correct),
    });

    return { quiz_id: quizId, questions };
  },

  submit: async (
    quizId: number,
    answers: { question_id: number; answer: string }[]
  ): Promise<import("@/types/api").QuizSubmitResponse> => {
    await delay();

    const stored = generatedQuizStore.get(quizId);
    const results = answers.map((a) => {
      const qIdx =
        stored?.questions.findIndex((q) => q.id === a.question_id) ?? -1;
      const question = stored?.questions[qIdx];
      const correctIdx = stored?.correctIndices[qIdx] ?? 0;
      const correctAnswer = question?.options[correctIdx] ?? "";
      const isCorrect = a.answer === correctAnswer;
      return {
        question_id: a.question_id,
        correct: isCorrect,
        correct_answer: isCorrect ? null : correctAnswer,
      };
    });

    return {
      score: results.filter((r) => r.correct).length,
      total: answers.length,
      results,
    };
  },
};

/**
 * Unified Mock API (matches client.ts interface)
 */
export const mockApi = {
  health: {
    check: async () => ({ status: "ok" as const, version: "mock" }),
  },
  auth: {
    login: async (_data: import("@/types/api").ClerkLoginRequest) => ({
      id: "mock-1",
      email: "mock@test.com",
      username: "Mock User",
    }),
    me: async () => ({
      id: "mock-1",
      email: "mock@test.com",
      username: "Mock User",
    }),
  },
  models: mockModelsApi,
  chat: mockChatApi,
  notes: mockNotesApi,
  quiz: mockQuizApi,
};
