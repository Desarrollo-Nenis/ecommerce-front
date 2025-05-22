export interface Producto {
  id: number
  nombre: string
  cantidad: number
  precio: number
  imagen: string
}

export interface Pedido {
  id: string
  fecha: string
  estado: string
  total: number
  productos: Producto[]
  direccion: string
}

export interface SimplifiedOrder {
  id: number
  orderId: string
  createdAt: string
  monto: number
  moneda: string
  estadoPago: string
  proveedor: string
  providerPaymentId: string
  items: {
    id: string
    title: string
    quantity: number
    unitPrice: number
    imagen: string
  }[]
  cliente: Cliente
}

export interface Orders {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  createdAt:         Date;
  id:                number;
  documentId:        string;
  monto:             number;
  moneda:            string;
  estadoPago:        string;
  proveedor:         string;
  providerPaymentId: string;
  transactionId:     null;
  orderId:           string;
  metadata:          DatumMetadata;
  updatedAt:         Date;
  publishedAt:       Date;
  locale:            null;
  cliente:           Cliente;
}

export interface Cliente {
  id:           number;
  documentId:   string;
  createdAt:    Date;
  updatedAt:    Date;
  publishedAt:  null;
  locale:       null;
  password:     null;
  name:         string;
  lastName:     string;
  role:         string;
  email:        string;
  authProvider: string;
}

export interface DatumMetadata {
  orderId:           string;
  processorResponse: ProcessorResponse;
  items:             Item[];
}

export interface Item {
  id:          string;
  title:       string;
  description: string;
  quantity:    number;
  unitPrice:   number;
}

export interface ProcessorResponse {
  id:                                   string;
  object:                               string;
  adaptive_pricing:                     AdaptivePricing;
  after_expiration:                     null;
  allow_promotion_codes:                null;
  amount_subtotal:                      number;
  amount_total:                         number;
  automatic_tax:                        AutomaticTax;
  billing_address_collection:           null;
  cancel_url:                           string;
  client_reference_id:                  null;
  client_secret:                        null;
  collected_information:                CollectedInformation;
  consent:                              null;
  consent_collection:                   null;
  created:                              number;
  currency:                             string;
  currency_conversion:                  null;
  custom_fields:                        any[];
  custom_text:                          CustomText;
  customer:                             null;
  customer_creation:                    string;
  customer_details:                     CustomerDetails;
  customer_email:                       string;
  discounts:                            any[];
  expires_at:                           number;
  invoice:                              null;
  invoice_creation:                     InvoiceCreation;
  livemode:                             boolean;
  locale:                               null;
  metadata:                             ProcessorResponseMetadata;
  mode:                                 string;
  payment_intent:                       null;
  payment_link:                         null;
  payment_method_collection:            string;
  payment_method_configuration_details: null;
  payment_method_options:               PaymentMethodOptions;
  payment_method_types:                 string[];
  payment_status:                       string;
  permissions:                          null;
  phone_number_collection:              AdaptivePricing;
  recovered_from:                       null;
  saved_payment_method_options:         null;
  setup_intent:                         null;
  shipping_address_collection:          null;
  shipping_cost:                        null;
  shipping_options:                     any[];
  status:                               string;
  submit_type:                          null;
  subscription:                         null;
  success_url:                          string;
  total_details:                        TotalDetails;
  ui_mode:                              string;
  url:                                  string;
  wallet_options:                       null;
}

export interface AdaptivePricing {
  enabled: boolean;
}

export interface AutomaticTax {
  enabled:   boolean;
  liability: null;
  provider:  null;
  status:    null;
}

export interface CollectedInformation {
  shipping_details: null;
}

export interface CustomText {
  after_submit:                null;
  shipping_address:            null;
  submit:                      null;
  terms_of_service_acceptance: null;
}

export interface CustomerDetails {
  address:    null;
  email:      string;
  name:       null;
  phone:      null;
  tax_exempt: string;
  tax_ids:    null;
}

export interface InvoiceCreation {
  enabled:      boolean;
  invoice_data: InvoiceData;
}

export interface InvoiceData {
  account_tax_ids:   null;
  custom_fields:     null;
  description:       null;
  footer:            null;
  issuer:            null;
  metadata:          InvoiceDataMetadata;
  rendering_options: null;
}

export interface InvoiceDataMetadata {
}

export interface ProcessorResponseMetadata {
  orderId: string;
}

export interface PaymentMethodOptions {
  card: Card;
}

export interface Card {
  request_three_d_secure: string;
}

export interface TotalDetails {
  amount_discount: number;
  amount_shipping: number;
  amount_tax:      number;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      string;
  pageSize:  string;
  pageCount: number;
  total:     number;
}

