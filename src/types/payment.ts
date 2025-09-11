export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'razorpay' | 'stripe';
  courseId: string;
  studentId: string;
  createdAt: Date;
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
}