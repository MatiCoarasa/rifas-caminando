export enum EstadoCompraRifa {
    PENDING = 'PENDING',
    PAGADO = 'PAGADO',
    CANCELADO = 'CANCELADO',
}

export class CompraRifa {
    public fechaCompra;
    public compradorNombre;
    public compradorEmail;
    public purchaseId: string;
    public numero?: number;

    constructor(fechaCompra: Date, compradorNombre: string, compradorEmail: string, purchaseId: string) {
        this.fechaCompra = fechaCompra;
        this.compradorNombre = compradorNombre;
        this.compradorEmail = compradorEmail;
        this.purchaseId = purchaseId;
    }

    public setNumero(numero: number) {
        this.numero = numero;
    }

    public setPurchaseId(purchaseId: string) {
        this.purchaseId = purchaseId;
    }

    public static fromObject(obj: any): CompraRifa {
        const compraRifa = new CompraRifa(obj.fechaCompra, obj.compradorNombre, obj.compradorEmail, obj.purchaseId);
        if (obj.numero) compraRifa.setNumero(obj.numero);
        return compraRifa;
    }
}
