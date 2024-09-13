import styles from "./VehicleImages.module.css";
import { useCar } from "../contexts/CarContext";
import { useState } from "react";

export default function VehicleImages() {
  const { newCarDetails, setNewCarDetails } = useCar();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  function handleInputImages(e, startIndex = null) {
    const files = Array.from(e.target.files);
    setNewCarDetails((car) => {
      let updatedImages = [...car.selectedImages];

      if (startIndex !== null) {
        for (let i = 0; i < files.length && startIndex + i < 4; i++) {
          updatedImages[startIndex + i] = files[i];
        }
      } else {
        updatedImages.push(...files.slice(0, 4 - updatedImages.length));
      }

      return {
        ...car,
        selectedImages: updatedImages.slice(0, 4),
      };
    });
  }

  function handleImageClick(index) {
    setSelectedImageIndex(index);
    document.getElementById(`file-input-${index}`).click();
  }

  return (
    <section className={styles.vehicle_images_container}>
      <div className={styles.cover_image}>
        {newCarDetails.selectedImages[0] && (
          <img
            src={URL.createObjectURL(newCarDetails.selectedImages[0])}
            alt="Cover"
          />
        )}
        <div>
          <label htmlFor="cover">
            <img src="../addphoto.png" alt="Add Cover" />
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleInputImages(e, 0)}
            style={{ display: "none" }}
            id="cover"
          />
          <div>
            <span>Cover Image</span>
            <p>
              Please choose a high-quality image as your cover photo that best
              represents your vehicle's condition and appeal
            </p>
          </div>
        </div>
      </div>

      <div>
        {newCarDetails.selectedImages.slice(1).map((img, index) => (
          <div key={index} className={styles.mini_images}>
            {img && (
              <img src={URL.createObjectURL(img)} alt={`Mini ${index + 1}`} />
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleInputImages(e, index + 1)}
              style={{ display: "none" }}
              id={`file-input-${index + 1}`}
            />
            <label onClick={() => handleImageClick(index + 1)}>
              <img src="../addphoto.png" alt="Add Mini" />
            </label>
          </div>
        ))}

        {[...Array(3 - newCarDetails.selectedImages.slice(1).length)].map(
          (_, index) => (
            <div key={index} className={styles.mini_images}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  handleInputImages(
                    e,
                    newCarDetails.selectedImages.length + index
                  )
                }
                style={{ display: "none" }}
                id={`file-input-${index + newCarDetails.selectedImages.length}`}
              />
              <label
                onClick={() =>
                  handleImageClick(index + newCarDetails.selectedImages.length)
                }
              >
                <img src="../addphoto.png" alt="Add Mini" />
              </label>
            </div>
          )
        )}
      </div>
    </section>
  );
}
