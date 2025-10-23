export interface PaymentMethod {
	title: string;
	logo: string;
	account: {
		name: string;
		number: string;
	};
}

export const paymentMethods: PaymentMethod[] = [
	{
		title: "Tigo Pesa Lipa Namba",
		logo: "tigo",
		account: {
			name: "MASAWE MR LOW PRISE",
			number: "17251913",
		},
	},
	{
		title: "NMB",
		logo: "nmb",
		account: {
			name: "MUSTAFA RASHIDI MASSAWE",
			number: "41510026996",
		},
	},
	{
		title: "CRDB",
		logo: "crdb",
		account: {
			name: "Zou Yuxiang",
			number: "0152932498200",
		},
	},
];
