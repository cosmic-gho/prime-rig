import { NextResponse } from 'next/server';
import { supabase } from "@/integrations/supabase/client";

// Preflight CORS handler
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*', // Replace '*' with your HTML site's URL for better security
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET() {
  try {
    // Fetch products from the Supabase database
    const { data: products, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { 
          status: 500, 
          headers: { 'Access-Control-Allow-Origin': '*' } 
        }
      );
    }

    // Return the products with CORS headers allowing the HTML site to read it
    return NextResponse.json(
      { products },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (err) {
    console.error('Unexpected error fetching products:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { 
        status: 500, 
        headers: { 'Access-Control-Allow-Origin': '*' } 
      }
    );
  }
}
