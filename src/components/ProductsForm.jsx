import React, { useState } from "react";
import stylesProduct from "../styles/productForm.module.css";
import TextArea from "./TextArea";
import Input from "./Input";
import Button from "./Button";
import FilePicker from "./FilePicker";
import MultiSelector from "./Multiselector";

const ProductsForm = ({onClose,clase}) => {

  const [product, setProduct] = useState({
    name: "",
    reference: "",
    description: "",
    material: "",
    color: "",
    designer: "",
    price: "",
    images: [],
    categories: "",
    sizes: [],
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
    categories: "",
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

  const url = "http://localhost:8080/api/v1/products";

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
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        setError({
          ...error,
          images:
            "El archivo debe ser una imagen en formato .jpg, .jpeg, .png, .webp, .svg o .gif.",
        });
        return;
      }

      setProduct((prevProduct) => ({...prevProduct,images: [...prevProduct.images, file]}));
      setError({ ...error, images: "" });
    }
  };
  const handleCategories = (e) => {
    setProduct({ ...product, categories: e.target.value });
    setError({ ...error, categories: "" });
  };

  const handleSizeChange = (selected) => {
    setProduct((prevProduct) => ({
        ...prevProduct,
        sizes: [...new Set([...prevProduct.sizes, ...selected])], // Concatenamos y eliminamos duplicados
      }));
    setError({ ...error, sizes: "" });
    console.log("Categorías seleccionadas:", selected);
  };

  const categorias = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ];
  const tallas = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' }
  ];

  const handdleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

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
    if (!onlyNumbers.test(product.price)) {
        errors.price = "el precio del producto solo debe contener numeros";
        formIsValid = false;
    }
    if (product.images.length==0 || product.images.length>5) {
        errors.images = "Debes subir al menos una imagen y maximo 5 al producto";
        formIsValid = false;
      }
    if (product.sizes.length==0 ) {
        errors.sizes = "Debes seleccionar al menos una talla";
        formIsValid = false;
      }
    if (!product.categories) {
        errors.categories = "Debes seleccionar una categoría.";
        formIsValid = false;
      }
    setError(errors);

    if (formIsValid) {
      const body = {
        name: product.name.trim(),
        reference:product.reference,
        description: product.description.trim(),
        material: product.material,
        color:product.color,
        designer: product.designer,
        price: product.price,
        images:product.images,
        category:product.categories,
        sizes:product.sizes,

      };

      const settings = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        await realizarCreacionProducto(settings);
        e.target.reset();
      } catch (err) {
        console.error("Error during form submission:", err);
      }
    }
  };

  async function realizarCreacionProducto(settings) {
    try {
      const response = await fetch(url, settings);

      // Handle non-201 status codes
      if (response.status == 201) {
        setModalInfo({
          show: true,
          titulo: "¡Felicidades!",
          subtitulo: "Tu registro ha sido exitoso.",
          mensaje:
            "Te hemos registrado correctamente en nuestra web. Ahora puedes acceder a todas las funciones y beneficios que ofrecemos.",
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
    } catch (err) {
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
  

  return (
    <div className={stylesProduct.container}>
      <div className={stylesProduct.contenedorForm}>
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
          <div className={stylesProduct.formulario}>
            <h2 className={stylesProduct.title}>Crear producto</h2>
            <form onSubmit={handdleSubmit} className={stylesProduct.registro}>
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
                  label="Categorias"
                  options={categorias}
                  placeholder="Seleccione una categoria"
                  onChange={handleCategories}
                  multiselector={false}
                  error={error.categories}
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
                  options={tallas}
                  placeholder="Seleccione la talla"
                  onChange={handleSizeChange}
                  multiselector={true}
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
              <Button>Registrar</Button>
              <button onClick={onClose} className={clase}>Cancelar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsForm;
