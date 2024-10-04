import styles from './RifasForm.module.css';
import {ChangeEvent, MouseEvent, useState} from "react";
import { useRouter } from "next/navigation";

export default function RifasForm() {
  const precioPorRifa = parseInt(process.env.NEXT_PUBLIC_PRECIO_RIFA!);
  const cantRifasIniciales = 1;

  const [formData, setFormData] = useState({ nombre: '', email: '', cantRifas: 1 });
  const [total, setTotal] = useState(precioPorRifa);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  let cantRifasSync = cantRifasIniciales;
  function handleChangeValueClick(ev: MouseEvent, newRifasValue: number) {
    ev.preventDefault();
    cantRifasSync = Math.max(1, newRifasValue);
    setFormData({ ...formData, cantRifas: cantRifasSync});
    setTotal(cantRifasSync * precioPorRifa);
    // fetch('/api/email', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     to: email,
    //     subject: 'Compra de rifa',
    //     text: `Gracias por tu compra de ${cantRifasSync} rifa${cantRifasSync > 1 ? 's' : ''}!`
    //   }),
    // }).then(() => console.log('Email enviado')).catch(console.error);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleIrAPagar(ev: MouseEvent) {
    ev.preventDefault();

    // Validate fields
    const newErrors = { nombre: '', email: '' };

    if (!formData.nombre) newErrors.nombre = "Por favor, completá tu nombre";
    if (!formData.email) newErrors.email = "Por favor, completá tu email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El email ingresado no es válido";

    if (newErrors.nombre || newErrors.email) {
      alert([newErrors.nombre, newErrors.email].join('\n'));
      return;
    }

    let url;
    setLoading(true);
    try {
      const response = await fetch('/api/rifas', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const responseJson = await response.json();
      url = responseJson.url;

    } catch (err) {
      console.log(err);
      alert('Ocurrió un error. Por favor, intentalo de nuevo. Si el problema persiste, contactanos a contacto@caminandojuntosok.com');
    } finally {
      setLoading(false);
    }

    router.push(url);
  }

  async function handleKeyPress (event: any) {
    if (event.key === "Enter") {
      await handleIrAPagar(event);
    }
  }

  return (
    <form className={styles.container} onKeyDown={handleKeyPress}>
      <div>
        <h3>COMPLETÁ TUS DATOS</h3>
        <div className={styles.datosContainer}>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Tu nombre completo*"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Tu dirección de email*"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h3>SELECCIONÁ LA CANTIDAD DE RIFAS</h3>
        <div className={styles.compraContainer}>
          <button
            className={styles.valueButton}
            onClick={(e) => handleChangeValueClick(e, formData.cantRifas - 1)}>-
          </button>
          <span className={styles.cantRifas}>{formData.cantRifas}</span>
          <button
            className={styles.valueButton}
            onClick={(e) => handleChangeValueClick(e, formData.cantRifas + 1)}>+
          </button>
          <span className={styles.total}>Total: <b>${total.toLocaleString()}</b></span>
        </div>
      </div>
      <button className={styles.mpButton} onClick={handleIrAPagar} disabled={loading}>
        {loading ? <span className={styles.loader}></span> : "Ir a Mercado Pago"}
      </button>
    </form>
  )
}
