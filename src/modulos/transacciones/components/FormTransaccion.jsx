import { useForm } from "react-hook-form";

const FormularioTransaccion = ({ categorias = [], cuentas = [], transaccionAEditar = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const crearOperacion = (data) => {
    // Acá inyectás tu lógica para hacer el POST o PUT
    console.log("Datos listos para enviar:", data);
  };

  return (
    <form onSubmit={handleSubmit(crearOperacion)} className="p-3">
      <div className="mb-3">
        <label className="form-label">Tipo de Movimiento</label>
        <select className="form-select" {...register("tipo", { required: "Seleccioná un tipo" })}>
          <option value="" >Seleccionar</option>
          <option value="Gasto">Gasto</option>
          <option value="Ingreso">Ingreso</option>
        </select>
        {errors.tipo && <span className="text-danger">{errors.tipo.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Monto</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          {...register("monto", { 
            required: "El monto es obligatorio", 
            min: { value: 0, message: "No puede ser negativo" } 
          })}
        />
        {errors.monto && <span className="text-danger">{errors.monto.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select className="form-select" {...register("categoria", { required: "Elegí una categoría" })}>
          <option value="">Seleccionar...</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.nombre}</option>
          ))}
        </select>
        {errors.categoria && <span className="text-danger">{errors.categoria.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Cuenta</label>
        <select className="form-select" {...register("cuenta", { required: "Elegí una cuenta" })}>
          <option value="">Seleccionar...</option>
          {cuentas.map((cta) => (
            <option key={cta._id} value={cta._id}>{cta.nombre}</option>
          ))}
        </select>
        {errors.cuenta && <span className="text-danger">{errors.cuenta.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          {...register("fecha", { required: "La fecha es obligatoria" })}
        />
        {errors.fecha && <span className="text-danger">{errors.fecha.message}</span>}
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select className="form-select" {...register("estado")}>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          rows="2"
          {...register("descripcion", { maxLength: { value: 200, message: "Máximo 200 caracteres" } })}
        ></textarea>
        {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Guardar Transacción
      </button>
    </form>
  );
};

export default FormularioTransaccion;