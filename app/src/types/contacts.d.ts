interface Navigator {
    contacts?: {
      select(properties: string[], options: { multiple: boolean }): Promise<
        Array<{
          name?: string;
          email?: string;
          tel?: string;
        }>
      >;
    };
  }
  