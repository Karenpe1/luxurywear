import { useState } from "react";
import styles from "../styles/CategoryForm.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import useAxios from "../Utils/axiosInstance";
import { v4 as uuidv4 } from "uuid";
import TextArea from "./TextArea";
import FilePicker from "./FilePicker";

const CategoryForm = ({ onClose, clase }) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    imageFile: "",
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    titulo: "",
    subtitulo: "",
    mensaje: "",
    img: "",
  });

  const axios = useAxios();
  const noNumbersRegex = /^[^\d]*$/;

  const toUrlFriendlyString = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleDescription = (e) => {
    setCategory({ ...category, description: e.target.value });
    setError({ ...error, [description]: "" }); // Limpiar el error al cambiar el valor
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        setError({
          ...error,
          imageFile:
            "El archivo debe ser una imagen en formato .jpg, .jpeg, .png, .webp, .svg o .gif.",
        });
        return;
      }

      setCategory({ ...category, imageFile: file });
      setError({ ...error, imageFile: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    if (
      !noNumbersRegex.test(category.name) ||
      category.name.trim().length < 3
    ) {
      errors.name = "El nombre debe ser válido y tener al menos 3 caracteres.";
      formIsValid = false;
    }

    if (category.description.trim().length < 5) {
      errors.description = "La descripción debe tener al menos 5 caracteres.";
      formIsValid = false;
    }

    if (!category.imageFile) {
      errors.imageFile = "Debes subir una imagen para la categoría.";
      formIsValid = false;
    }

    setError(errors);

    if (formIsValid) {
      const uniqueIdentifier = uuidv4();
      const fileExtension = category.imageFile.name.split(".").pop();
      const fileName = `${toUrlFriendlyString(
        category.name
      )}__${uniqueIdentifier}.${fileExtension}`;
      const fileUrl = `/public/img/categories/${fileName}`;

      const body = {
        name: category.name.trim(),
        description: category.description.trim(),
        cover: {
          url: fileUrl,
        },
      };

      const formData = new FormData();
      formData.append("file", category.imageFile);
      // formData.append("name", category.name.trim());
      formData.append("name", fileName);

      try {
        // Upload the image
        await axios.post("/api/v1/categories/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Submit the category
        const response = await axios.post("/api/v1/categories", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          setModalInfo({
            show: true,
            titulo: "¡Felicidades!",
            subtitulo: "Categoría agregada exitosamente.",
            mensaje: "",
            img: "./Estrellas.svg",
          });
        }
      } catch (err) {
        console.error("Error during form submission:", err);
        setModalInfo({
          show: true,
          titulo: "Error",
          subtitulo: "Ocurrió un problema.",
          mensaje: "No se pudo agregar la categoría. Intenta nuevamente.",
          img: "./ohNo.png",
        });
      }
    }
  };

  const handleSuccessClose = () => {
    // Reset form fields
    setCategory({
      name: "",
      description: "",
      imageFile: null,
    });
    setError({
      name: "",
      description: "",
      imageFile: "",
    });

    // Close the modal
    setModalInfo({ ...modalInfo, show: false });
    if (onClose) onClose(); // Notify parent to close the modal
  };

  return (
    <div className={styles.container}>
      <div className={styles.contenedorForm}>
        {modalInfo.show ? (
          <Modal
            img={modalInfo.img}
            titulo={modalInfo.titulo}
            subtitulo={modalInfo.subtitulo}
            mensaje={modalInfo.mensaje}
            onClose={handleSuccessClose}
          />
        ) : (
          <div className={styles.formulario}>
            <h2>Crear Categoría</h2>
            <form onSubmit={handleSubmit} className={styles.registro}>
              <Input
                label="Nombre *"
                placeholder="Nombre de la categoría"
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                error={error.name}
              />
              <TextArea
                label="Descripción *"
                id="descripcion"
                name="description"
                placeholder="Descripción de la categoría"
                value={category.description}
                onchange={handleDescription}
                error={error.description}
              />

              <FilePicker
                label="imagen *"
                type="file"
                accept=".jpg,.jpeg,.png"
                cambio={handleFileChange}
                error={error.imageFile}
                archivos={1}
              />

              <Button>Crear Categoría</Button>
              <button onClick={onClose} className={clase}>
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
