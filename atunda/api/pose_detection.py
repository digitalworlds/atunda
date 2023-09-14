import mediapipe as mp
import cv2
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe.framework.formats import landmark_pb2
from mediapipe import solutions


def draw_landmarks_on_image(rgb_image, detection_result):
  pose_landmarks_list = detection_result.pose_landmarks
  annotated_image = np.copy(rgb_image)

  # Loop through the detected poses to visualize.
  for idx in range(len(pose_landmarks_list)):
    pose_landmarks = pose_landmarks_list[idx]

    # Draw the pose landmarks.
    pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
    pose_landmarks_proto.landmark.extend([
      landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in pose_landmarks
    ])
    solutions.drawing_utils.draw_landmarks(
      annotated_image,
      pose_landmarks_proto,
      solutions.pose.POSE_CONNECTIONS,
      solutions.drawing_styles.get_default_pose_landmarks_style())
  return annotated_image


def get_pose_array(input_path: str, output_path: str, model_asset_path: str):
  # Configers base options for landmark detection
  VisionRunningMode = mp.tasks.vision.RunningMode
  base_options = python.BaseOptions(model_asset_path=model_asset_path)
  options = vision.PoseLandmarkerOptions(
    base_options=base_options,
    output_segmentation_masks=True,
    running_mode=VisionRunningMode.VIDEO
  )
  detector = vision.PoseLandmarker.create_from_options(options)

  # Opens the input file and ouput file based on paths given
  video = cv2.VideoCapture(input_path)
  fourcc = cv2.VideoWriter_fourcc(*'XVID')
  out = cv2.VideoWriter(output_path, fourcc, video.get(cv2.CAP_PROP_FPS), (int(video.get(3)), int(video.get(4))))

  frame_positions = []
  # Iterates over every frame in the input
  while video.isOpened():
    success, frame = video.read()
    if not success:
      break
    # Converts frame to mediapipe image and runs detection on it
    # Uses video detection mode for more optimized performance
    frame_timestamp = int(video.get(cv2.CAP_PROP_POS_MSEC))
    image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
    detection_result = detector.detect_for_video(image, frame_timestamp)
    # print(detection_result)
    # frame_positions.append(detection_result.pose_landmarks[0])
    
    # Annotates landmarks onto current frame and writes the frame to the output file
    annotated_frame = draw_landmarks_on_image(frame, detection_result)
    out.write(annotated_frame)

  video.release()
  out.release()
  cv2.destroyAllWindows()

  return np.array(frame_positions)

def main():
  np_frames = get_pose_array()
  print(np_frames)

if __name__ == "__main__":
  main()