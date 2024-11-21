import { useEffect, useState } from "react";
import stylesProduct from "../styles/productForm.module.css";
import TextArea from "./TextArea";
import Input from "./Input";
import Button from "./Button";
import FilePicker from "./FilePicker";
import MultiSelector from "./Multiselector";
import useAxios from "../Utils/axiosInstance";
import Modal from "./Modal.jsx";
import {v4 as uuidv4} from "uuid";

const MAX_FILES = 5;

const ProductsForm = ({ onClose, clase, isEdit=false, initialData={} }) => {

  const [product, setProduct] = useState({
    name: "",
    reference: "",
    description: "",
    material: "",
    color: "",
    designer: "",
    price: "",
    images: [],
    category: null, // Change to null to represent an object
    sizes: [], // Updated to handle objects
  });
  const [error, setError] = useState({
    name: "",
    reference: "",
    description: "",
    material: "",
    color: "",
    designer: "",
    price: "",
    images: "",
    category: "",
    sizes: "",
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    titulo: "",
    subtitulo: "",
    mensaje: "",
    img: "",
  });
  // eslint-disable-next-line no-useless-escape
  const noNumbersRegex = /^[^\d]*$/;
  const onlyNumbers=/^-?\d+(\.\d+)?$/;

  const toUrlFriendlyString = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const url = "http://localhost:8080/api/v1/products";
  const [categoriesTitle, setCategoriesTitle] = useState([]);
  const [sizesOptions, setSizesOptions] = useState([]);
  const axios= useAxios();

  // Load categories and sizes from the backend
  useEffect(() => {
    const fetchCategoriesAndSizes = async () => {
      const [categoriesResponse, sizesResponse] = await Promise.all([
        fetch("http://localhost:8080/api/v1/categories"),
        fetch("http://localhost:8080/api/v1/sizes"), // Assuming endpoint exists
      ]);
      const categoriesData = await categoriesResponse.json();
      const sizesData = await sizesResponse.json();

      setCategoriesTitle(categoriesData.map(category => ({
        value: category.id,
        label: category.name,
        id: category.id,
        name: category.name,
      })));

      setSizesOptions(sizesData.map(size => ({
        value: size.id,
        label: size.size,
        id: size.id,
        size: size.size,
      })));
    };
    fetchCategoriesAndSizes();
  }, []);

  // Prellenar los campos si se está editando
  useEffect(()=>{
    if(isEdit && initialData){
      setProduct(initialData);
    }
  },[isEdit,initialData]);

  const handleNombre = (e) => {
    setProduct({ ...product, name: e.target.value });
    setError({ ...error, name: "" }); // Limpiar el error al cambiar el valor
  };
  const handleReferencia = (e) => {
    setProduct({ ...product, reference: e.target.value });
    setError({ ...error, reference: "" });
  };
  const handleDescription = (e) => {
    setProduct({ ...product, description: e.target.value });
    setError({ ...error, description: "" });
  };
  const handleMaterial = (e) => {
    setProduct({ ...product, material: e.target.value });
    setError({ ...error, material: "" });
  };
  const handleColor = (e) => {
    setProduct({ ...product, color: e.target.value });
    setError({ ...error, color: "" });
  };
  const handleDesigner = (e) => {
    setProduct({ ...product, designer: e.target.value });
    setError({ ...error, designer: "" });
  };
  const handlePrice = (e) => {
    setProduct({ ...product, price: e.target.value });
    setError({ ...error, price: "" });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"];

    // Validate file types
    const invalidFiles = files.filter(
      (file) => !validExtensions.includes(file.name.split(".").pop().toLowerCase())
    );

    if (invalidFiles.length > 0) {
      setError({
        ...error,
        images: "El archivo debe ser una imagen en formato .jpg, .jpeg, .png, .webp, .svg o .gif",
      });
      return;
    }

    // Access the current state of product directly
    const currentImages = product?.images || [];

    // Validate file count
    if (currentImages.length + files.length > MAX_FILES) {
      setError({
        ...error,
        images: `Puedes cargar hasta ${MAX_FILES} imágenes.`,
      });
      return;
    }

    // Update the product based on the isEdit flag
    if (isEdit) {
      // For editing an existing product
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...(prevProduct.images || []), ...files], // Append new files to existing images
      }));
    } else {
      // For creating a new product
      setProduct({...product, images: files});
    }

    setError({ ...error, images: "" });
  };

  const handleCategories = (selected) => {
    const category = categoriesTitle.find((cat) => cat.value === selected.value);
    setProduct({ ...product, category }); // Assign the full object
    setError({ ...error, category: "" });
  };

  const handleSizeChange = (selected) => {
    console.log(selected);
    const selectedSizes = selected.map((sizeId) =>
      sizesOptions.find((size) => size.value === sizeId)
    );
    setProduct({ ...product, sizes: selectedSizes }); // Assign objects
    setError({ ...error, sizes: "" });
    console.log("Tallas seleccionadas:", selected);
  };

  const handdleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    let errors = {};

    if (!noNumbersRegex.test(product.name) || product.name.trim().length < 3) {
      errors.name= "El nombre debe ser válido y tener al menos 3 caracteres";
      formIsValid = false;
    }
    if (product.reference.trim().length < 1) {
      errors.reference =
        "La referencia debe ser válido y tener al menos 1 caractere";
      formIsValid = false;
    }
    if (product.description.trim().length < 5) {
        errors.description = "La descripción debe tener al menos 5 caracteres.";
      formIsValid = false;
    }
    if (!noNumbersRegex.test(product.material)||product.material.trim().length < 4) {
      errors.material = "el material debe ser valido y tener más de 4 caracteres";
      formIsValid = false;
    }
    if (!noNumbersRegex.test(product.color)|| product.color.trim().length < 3) {
        errors.color = "el material debe ser valido y tener más de 3 caracteres";
        formIsValid = false;
    }
    if (!noNumbersRegex.test(product.designer)||product.designer.trim().length < 3) {
        errors.designer = "el Diseñador debe ser valido y tener más de 3 caracteres";
        formIsValid = false;
    }
    if (!onlyNumbers.test(product.price)|| !product.price || isNaN(product.price)) {
        errors.price = "el precio del producto solo debe contener numeros";
        formIsValid = false;
    }
    if (product.images.length==0 || product.images.length>5) {
        errors.images = "Debes subir al menos una imagen y maximo 5 al producto";
        formIsValid = false;
      }

    if (product.category === null) {
      errors.category = "Debes seleccionar una categoría.";
      formIsValid = false;
    }
    if (product.sizes.length === 0) {
      errors.sizes = "Debes seleccionar al menos una talla.";
      formIsValid = false;
    }
    setError(errors);

    if (formIsValid) {
      const uploadedImages = isEdit
        ? product.images
        : await Promise.all(
          product.images.map(async (file) => {
            const formData = new FormData();
            const uniqueIdentifier = uuidv4();
            const fileExtension = file.name.split(".").pop();
            // const fileName = `${product.name.toLowerCase()}__${uniqueIdentifier}.${fileExtension}`;
            const fileName = `${toUrlFriendlyString(product.name)}__${uniqueIdentifier}.${fileExtension}`;
            formData.append("file", file);
            formData.append("name", fileName);
            formData.append("category", product.category.name.toLowerCase());

            const response = await axios.post("/api/v1/products/upload", formData, {
              headers: {"Content-Type": "multipart/form-data"},
            });
            return {url: response.data.response};
          })
      );

      const body = {
        name: product.name.trim(),
        reference: product.reference,
        description: product.description.trim(),
        material: product.material,
        color: product.color,
        designer: product.designer,
        price: product.price,
        images: uploadedImages,
        category: product.category, // Now an object
        sizes: product.sizes, // Now an array of objects
      };

      const method = isEdit ? "PUT" : "POST";
      const endpoint = isEdit ? `${url}/${product.id}` : url;

      try {
        const response = await axios({
        method,
          url: endpoint,
          data: body,
        });

        // Handle non-201 status codes
        if (response.status === 201) {
          setModalInfo({
            show: true,
            titulo: "¡Felicidades!",
            subtitulo: "Tu registro ha sido exitoso.",
            mensaje: "El producto se ha guardado correctamente.",
            img: "./Estrellas.svg",
          }); //mostrar el mensaje de exito
        } else {
          const errorMessages = {
            409: "Ya hay un usuario creado con ese correo electrónico.",
            400: "Solicitud inválida. Por favor, verifica los datos ingresados.",
            500: "Error del servidor. Por favor, intenta más tarde.",
          };

          const message =
            errorMessages[response.status] ||
            `Ocurrió un error inesperado (Código: ${response.status}).`;
          setModalInfo({
            show: true,
            img: "./ohNo.png",
            titulo: "Error",
            subtitulo: "Ha ocurrido un problema.",
            mensaje: message,
          });
        }

        // Parse the successful response
        const data = await response.json();
        console.log(data);
      }catch (err) {
        // Handle network or other fetch errors
        setModalInfo({
          show: true,
          titulo: "Error de conexión",
          subtitulo: "Hubo un problema con la conexión.",
          mensaje:
            "Por favor, verifica tu conexión a Internet e intenta nuevamente.",
          img: "./ohNo.png",
        });
        console.error("Error al realizar el registro:", err);
      }
    }
  };

  return (
    <div className={stylesProduct.containerProduct}>
      <div className={stylesProduct.contenedorFormProduct}>
        {modalInfo.show ? (
          <Modal
            img={modalInfo.img}
            titulo={modalInfo.titulo}
            subtitulo={modalInfo.subtitulo}
            mensaje={modalInfo.mensaje}
            onClose={() => {
              setModalInfo({ ...modalInfo, show: false });
            }}
          />
        ) : (
          <div className={stylesProduct.formularioProduct}>
            <h2 className={stylesProduct.title}>
              {isEdit? "Editar Producto": "Crear Producto"}
            </h2>
            <form onSubmit={handdleSubmit} className={stylesProduct.registroProduct}>
              <Input
                id="nombre"
                label="Nombre"
                placeholder="Ingresa el nombre del producto"
                type="text"
                value={product.name}
                onChange={handleNombre}
                error={error.name}
                className={stylesProduct.nombre}
              />
              
              <MultiSelector
                  label="Categorías"
                  options={categoriesTitle}
                  placeholder="Seleccione una categoría"
                  onChange={handleCategories}
                  multiselector={false}
                  error={error.category}
                  preselected= {product.categories}
                />

              <div className={stylesProduct.grid}>
                <Input
                  id="Referencia"
                  label="Referencia"
                  placeholder="Ingresa la referencia del producto"
                  type="text"
                  value={product.reference}
                  onChange={handleReferencia}
                  error={error.reference}
                  className={stylesProduct.inputMedio}
                />

                <Input
                  label="Material"
                  id="material"
                  placeholder="Ingrese su material"
                  type="text"
                  value={product.material}
                  onChange={handleMaterial}
                  error={error.material}
                  className={stylesProduct.inputMedio}
                />

                <Input
                  label="Color"
                  id="color"
                  placeholder="Ingresa el color del producto"
                  type="text"
                  value={product.color}
                  onChange={handleColor}
                  error={error.color}
                  className={stylesProduct.inputMedio}
                />

                <Input
                  label="Diseñador"
                  id="diseñador"
                  placeholder="Ingrese el diseñador"
                  type="text"
                  value={product.designer}
                  onChange={handleDesigner}
                  error={error.designer}
                  className={stylesProduct.inputMedio}
                />
                <Input
                  label="Precio"
                  id="precio"
                  placeholder="Ingrese el precio"
                  type="text"
                  value={product.price}
                  onChange={handlePrice}
                  error={error.price}
                  className={stylesProduct.inputMedio}
                />

                <MultiSelector
                  label="Tallas"
                  options={sizesOptions}
                  placeholder="Seleccione las tallas"
                  // onChange={(selected) => handleSizeChange(selected.map((opt) => opt.value))}
                  onChange={handleSizeChange}
                  multiselector={true}
                  preselected={product.sizes.map((size) => size.value)} // Valores iniciales
                  error={error.sizes}
                />
              </div>
              <TextArea
                label="Descripción *"
                id="descripcion"
                name="description"
                placeholder="Descripción del producto"
                value={product.description}
                onchange={handleDescription}
                error={error.description}
              />
              <FilePicker
                label="Elegir imagen"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                error={error.images}
                archivos={2}
              />
              <Button>{isEdit? "Actualizar":"Registrar"}</Button>
              <button onClick={onClose} className={clase}>Cancelar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsForm;
