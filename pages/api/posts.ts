import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  // yeah, i know. i should've used switch case or something
  if (method === "GET") {
    let { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      res.status(500).send({ error });
      return;
    }

    res.status(200).json(posts);
  } else if (method === "POST") {
    const { link, label } = req.body;
    const { data, error } = await supabase
      .from("posts")
      .insert([{ photo_url: link, label: label }]);

    if (error) {
      res.status(500).send({ error });
      return;
    }
    res.status(200).json(data);
  } else if (method === "DELETE") {
    const { postId } = req.body;
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) {
      res.status(500).send({ error });
      return;
    }
    res.status(200).json(data);
  }
};
