import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { data: posts, error } = await supabase.from("posts").select("*");

  res.status(200).json(posts);
};
