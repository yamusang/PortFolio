import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.awt.FileDialog;
import javax.swing.JFrame;

public class FileIoWordCountApp {
    public static void main(String[] args) {
        readByLine();
    }
        public static void readByLine() {
        // int ch;
        String line = null;
        int wordcount = 0;
        int hwordcount = 0;
        FileReader fr = null;
        Scanner sc = null;
        try {
            String readFilename = showFileDialog("파일 선택", FileDialog.LOAD);
            fr = new FileReader(readFilename, Charset.forName("UTF-8"));
            sc = new Scanner(fr);
              
            while (sc.hasNext()) { 
                line = sc.nextLine();
                String[] words = line.split("\\s");
                for(int i = 0; i<words.length;i++){
                    Pattern pattern = Pattern.compile("\\b[a-zA-Z]+\\b");
                    Matcher matcher = pattern.matcher(words[i]);
                    Pattern hpattern = Pattern.compile("[가-힣]+");
                    Matcher hmatcher = hpattern.matcher(words[i]);
                    while (matcher.find()) {
                        wordcount++;
                    }
                    while (hmatcher.find()) {
                        hwordcount++;
                    }
                }
            }
            System.out.println("파일에 포함된 영어단어는 총"+wordcount+"개");
            System.out.println("파일에 포함된 한글단어는 총"+hwordcount+"개");
        } catch (Exception e) {
            System.out.println("예외 : " + e.getMessage());
        } finally {
            try {
                fr.close();
                sc.close();
            } catch (IOException e) {
            }
        }

        
    }

    public static String showFileDialog(String title, int type) {
        JFrame jf = new JFrame();
        jf.setVisible(false);

        FileDialog fd = new FileDialog(jf, title, type); 
        fd.setVisible(true);

        jf.dispose();

        if (fd.getDirectory() == null || fd.getFile() == null) {
            return null;
        } else {
            return fd.getDirectory() + fd.getFile();
        }
    }
}
