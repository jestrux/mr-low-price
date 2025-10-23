export interface PaymentMethod {
	title: string;
	logo: string;
	logoUrl: string;
	account: {
		name: string;
		number: string;
	};
}

const baseUrl = import.meta.env.BASE_URL;

export const paymentMethods: PaymentMethod[] = [
	{
		title: "Tigo Pesa Lipa Namba",
		logo: "tigo",
		logoUrl: `${baseUrl}img/payment-options/tigo.png`,
		account: {
			name: "MASAWE MR LOW PRISE",
			number: "17251913",
		},
	},
	{
		title: "NMB",
		logo: "nmb",
		logoUrl: `${baseUrl}img/payment-options/nmb.png`,
		account: {
			name: "MUSTAFA RASHIDI MASSAWE",
			number: "41510026996",
		},
	},
	{
		title: "CRDB",
		logo: "crdb",
		logoUrl: `${baseUrl}img/payment-options/crdb.png`,
		account: {
			name: "Zou Yuxiang",
			number: "0152932498200",
		},
	},
];
