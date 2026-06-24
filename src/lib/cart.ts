export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  private items: CartItem[] = [];

  addItem(item: CartItem): void {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}
