import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

const getCartItems = async () => {
  try {
    const cookieStorage = await cookies();

    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.cart.getCartItems));

    const result = await fetch(url.toString(), {
      cache: "no-store",
      next: { tags: ["cart-items"] },
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const deleteCartItems = async (id: string) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.cart.removeCartItem(id)));

    const res = await fetch(url.toString(), {
      method: "DELETE",
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const updateCartQuantity = async (id: string, newQuantity: number) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.cart.updateCartItem(id)));

    const res = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        message: data.message,
        error: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const addToCart = async (medicineId: string, quantity: number) => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.cart.addCartItems));

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ medicineId, quantity }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        message: data.message,
        error: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const clearCart = async () => {
  try {
    const cookieStorage = await cookies();
    //url
    const url = new URL(buildApiUrl(API_ENDPOINTS.cart.clearCart));

    const res = await fetch(url.toString(), {
      method: "DELETE",
      headers: { Cookie: cookieStorage.toString() },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

export const CartService = {
  getCartItems,
  deleteCartItems,
  updateCartQuantity,
  addToCart,
  clearCart,
};
