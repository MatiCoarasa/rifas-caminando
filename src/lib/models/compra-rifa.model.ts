export enum EstadoCompraRifa {
    PENDING = 'PENDING',
    PAGADO = 'PAGADO',
    CANCELADO = 'CANCELADO',
}

export class CompraRifa {
    public fechaCompra;
    public compradorNombre;
    public compradorEmail;
    public numero?;
    public estado: EstadoCompraRifa = EstadoCompraRifa.PENDING;

    constructor(fechaCompra: Date, compradorNombre: string, compradorEmail: string, numero?: number) {
        this.fechaCompra = fechaCompra;
        this.compradorNombre = compradorNombre;
        this.compradorEmail = compradorEmail;
        this.numero = numero;
    }

    static fromList(list: any[]): CompraRifa[] {
        return list.map((compra) => new CompraRifa(
          new Date(compra.fechaCompra),
          compra.compradorNombre,
          compra.compradorEmail,
          compra.numero
        ));
    }
}
